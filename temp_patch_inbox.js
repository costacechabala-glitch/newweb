const fs = require('fs');
const path = require('path');
const base = path.join('c:', 'Users', 'an', 'Desktop', 'Style advice');

function patchApi() {
  const file = path.join(base, 'frontend', 'src', 'services', 'api.js');
  let text = fs.readFileSync(file, 'utf8');
  if (text.includes('export const socialAPI')) {
    console.log('socialAPI already exists in api.js');
    return;
  }
  const marker = '// Chat API';
  const insert = `// Social API\nexport const socialAPI = {\n  getFeed: () => api.get('/social/feed'),\n  getCommunityUsers: () => api.get('/social/users'),\n  createShare: (data) => api.post('/social/share', data),\n  likeShare: (id) => api.post(\`/social/${id}/like\`),\n  commentShare: (id, comment) => api.post(\`/social/${id}/comment\`, { comment }),\n  followUser: (userId) => api.post(\`/social/${userId}/follow\`),\n  unfollowUser: (userId) => api.post(\`/social/${userId}/unfollow\`),\n  getInbox: () => api.get('/social/inbox'),\n  sendMessage: (recipientId, data) => api.post(\`/social/${recipientId}/message\`, data),\n};\n\n`;
  if (!text.includes(marker)) {
    throw new Error('marker not found in api.js');
  }
  text = text.replace(marker, insert + marker);
  fs.writeFileSync(file, text, 'utf8');
  console.log('patched api.js');
}

function patchCommunity() {
  const file = path.join(base, 'frontend', 'src', 'pages', 'Community.jsx');
  let text = fs.readFileSync(file, 'utf8');
  if (text.includes('const [messageDrafts')) {
    console.log('message draft state already exists in Community.jsx');
  } else {
    const stateMarker = "  const [commentTextById, setCommentTextById] = useState({});\n  const [activeComments, setActiveComments] = useState({});\n";
    const insertState = "  const [messageDrafts, setMessageDrafts] = useState({});\n  const [messageStatus, setMessageStatus] = useState({});\n";
    if (!text.includes(stateMarker)) throw new Error('state marker not found');
    text = text.replace(stateMarker, stateMarker + insertState);
    console.log('inserted message state');
  }
  if (!text.includes('const handleSendMessage')) {
    const handlerMarker = "  const handleUnfollow = async (userId) => {\n    try {\n      await socialAPI.unfollowUser(userId);\n      setCommunityUsers((prev) => prev.map((member) => (\n        member.id === userId ? { ...member, isFollowing: false, followersCount: Math.max(0, member.followersCount - 1) } : member\n      )));\n    } catch (err) {\n      console.error('Error unfollowing user', err);\n    }\n  };\n\n";
    const insertHandler = "  const handleMessageInputChange = (userId, value) => {\n    setMessageDrafts((prev) => ({ ...prev, [userId]: value }));\n  };\n\n  const handleSendMessage = async (userId) => {\n    const message = (messageDrafts[userId] || '').trim();\n    if (!message) return;\n\n    setMessageStatus((prev) => ({ ...prev, [userId]: 'sending' }));\n    setError(null);\n\n    try {\n      await socialAPI.sendMessage(userId, { message });\n      setMessageDrafts((prev) => ({ ...prev, [userId]: '' }));\n      setMessageStatus((prev) => ({ ...prev, [userId]: 'sent' }));\n      window.setTimeout(() => {\n        setMessageStatus((prev) => ({ ...prev, [userId]: undefined }));\n      }, 3000);\n    } catch (err) {\n      console.error('Error sending message', err);\n      setMessageStatus((prev) => ({ ...prev, [userId]: 'error' }));\n      setError('Unable to send the direct message. Please try again.');\n    }\n  };\n\n";
    if (!text.includes(handlerMarker)) throw new Error('handler marker not found');
    text = text.replace(handlerMarker, handlerMarker + insertHandler);
    console.log('inserted message handlers');
  }
  if (!text.includes('direct-message-control')) {
    const listMarker = "                  {communityUsers.map((member) => (\n                    <li key={member.id} className=\"community-user-card\">\n                      <div className=\"user-avatar-name\">\n                        <span className=\"avatar\">{member.name?.charAt(0) || 'U'}</span>\n                        <div>\n                          <strong>{member.name}</strong>\n                          <span>{member.followersCount} followers</span>\n                        </div>\n                      </div>\n                      {member.isFollowing ? (\n                        <button type=\"button\" className=\"btn-secondary\" onClick={() => handleUnfollow(member.id)}>\n                          Following\n                        </button>\n                      ) : (\n                        <button type=\"button\" className=\"btn-primary\" onClick={() => handleFollow(member.id)}>\n                          Follow\n                        </button>\n                      )}\n                    </li>\n                  ))}"
    const insertList = "                  {communityUsers.map((member) => (\n                    <li key={member.id} className=\"community-user-card\">\n                      <div className=\"user-avatar-name\">\n                        <span className=\"avatar\">{member.name?.charAt(0) || 'U'}</span>\n                        <div>\n                          <strong>{member.name}</strong>\n                          <span>{member.followersCount} followers</span>\n                        </div>\n                      </div>\n                      <div className=\"user-actions\">\n                        <div className=\"direct-message-control\">\n                          <input\n                            type=\"text\"\n                            value={messageDrafts[member.id] || ''}\n                            onChange={(event) => handleMessageInputChange(member.id, event.target.value)}\n                            placeholder={\`Message ${member.name}…\`}\n                            className=\"direct-message-input\"\n                          />\n                          <button\n                            type=\"button\"\n                            className=\"btn-primary\"\n                            onClick={() => handleSendMessage(member.id)}\n                            disabled={!messageDrafts[member.id]?.trim() || messageStatus[member.id] === 'sending'}\n                          >\n                            {messageStatus[member.id] === 'sending' ? 'Sending…' : 'Send'}\n                          </button>\n                        </div>\n                        {messageStatus[member.id] === 'sent' && <span className=\"message-status success\">Sent</span>}\n                        {messageStatus[member.id] === 'error' && <span className=\"message-status error\">Failed</span>}\n                        {member.isFollowing ? (\n                          <button type=\"button\" className=\"btn-secondary\" onClick={() => handleUnfollow(member.id)}>\n                            Following\n                          </button>\n                        ) : (\n                          <button type=\"button\" className=\"btn-primary\" onClick={() => handleFollow(member.id)}>\n                            Follow\n                          </button>\n                        )}\n                      </div>\n                    </li>\n                  ))}"
    if (!text.includes(listMarker)) throw new Error('community user list marker not found');
    text = text.replace(listMarker, insertList);
    console.log('inserted direct message UI');
  }
  fs.writeFileSync(file, text, 'utf8');
}

try {
  patchApi();
  patchCommunity();
} catch (err) {
  console.error('ERROR:', err.message);
  process.exit(1);
}

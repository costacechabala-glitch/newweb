const fs = require('fs');
const path = require('path');
const base = path.join('c:', 'Users', 'an', 'Desktop', 'Style advice');

function patchApi() {
  const file = path.join(base, 'frontend', 'src', 'services', 'api.js');
  let text = fs.readFileSync(file, 'utf8');
  const brokenBlock = `// Social API\nexport const socialAPI = {\n  getFeed: () => api.get('/social/feed'),\n  getCommunityUsers: () => api.get('/social/users'),\n  createShare: (data) => api.post('/social/share', data),\n  likeShare: (id) => api.post(/social//like),\n  commentShare: (id, comment) => api.post(/social//comment, { comment }),\n  followUser: (userId) => api.post(/social//follow),\n  unfollowUser: (userId) => api.post(/social//unfollow),\n  getInbox: () => api.get('/social/inbox'),\n  sendMessage: (recipientId, data) => api.post(/social//message, data),\n};\n\n`;
  const fixedBlock = `// Social API\nexport const socialAPI = {\n  getFeed: () => api.get('/social/feed'),\n  getCommunityUsers: () => api.get('/social/users'),\n  createShare: (data) => api.post('/social/share', data),\n  likeShare: (id) => api.post(\`/social/${id}/like\`),\n  commentShare: (id, comment) => api.post(\`/social/${id}/comment\`, { comment }),\n  followUser: (userId) => api.post(\`/social/${userId}/follow\`),\n  unfollowUser: (userId) => api.post(\`/social/${userId}/unfollow\`),\n  getInbox: () => api.get('/social/inbox'),\n  sendMessage: (recipientId, data) => api.post(\`/social/${recipientId}/message\`, data),\n};\n\n`;

  if (text.includes(fixedBlock)) {
    console.log('api.js already correct');
    return;
  }
  if (!text.includes(brokenBlock)) {
    throw new Error('Broken socialAPI block not found in api.js');
  }
  text = text.replace(brokenBlock, fixedBlock);
  fs.writeFileSync(file, text, 'utf8');
  console.log('patched api.js socialAPI block');
}

function patchCommunity() {
  const file = path.join(base, 'frontend', 'src', 'pages', 'Community.jsx');
  let text = fs.readFileSync(file, 'utf8');

  if (!text.includes("const [messageDrafts, setMessageDrafts] = useState({});")) {
    const marker = "  const [commentTextById, setCommentTextById] = useState({});\n  const [activeComments, setActiveComments] = useState({});\n";
    const insert = "  const [messageDrafts, setMessageDrafts] = useState({});\n  const [messageStatus, setMessageStatus] = useState({});\n";
    if (!text.includes(marker)) throw new Error('Community.jsx state marker not found');
    text = text.replace(marker, marker + insert);
    console.log('inserted message state in Community.jsx');
  }

  if (!text.includes('const handleSendMessage = async (userId) =>')) {
    const marker = "  const handleUnfollow = async (userId) => {\n    try {\n      await socialAPI.unfollowUser(userId);\n      setCommunityUsers((prev) => prev.map((member) => (\n        member.id === userId ? { ...member, isFollowing: false, followersCount: Math.max(0, member.followersCount - 1) } : member\n      )));\n    } catch (err) {\n      console.error('Error unfollowing user', err);\n    }\n  };\n\n";
    const insert = `  const handleMessageInputChange = (userId, value) => {\n    setMessageDrafts((prev) => ({ ...prev, [userId]: value }));\n  };\n\n  const handleSendMessage = async (userId) => {\n    const message = (messageDrafts[userId] || '').trim();\n    if (!message) return;\n\n    setMessageStatus((prev) => ({ ...prev, [userId]: 'sending' }));\n    setError(null);\n\n    try {\n      await socialAPI.sendMessage(userId, { message });\n      setMessageDrafts((prev) => ({ ...prev, [userId]: '' }));\n      setMessageStatus((prev) => ({ ...prev, [userId]: 'sent' }));\n      setTimeout(() => {\n        setMessageStatus((prev) => ({ ...prev, [userId]: undefined }));\n      }, 3000);\n    } catch (err) {\n      console.error('Error sending message', err);\n      setMessageStatus((prev) => ({ ...prev, [userId]: 'error' }));\n      setError('Unable to send the direct message. Please try again.');\n    }\n  };\n\n`;
    if (!text.includes(marker)) throw new Error('Community.jsx handleUnfollow marker not found');
    text = text.replace(marker, marker + insert);
    console.log('inserted message handlers in Community.jsx');
  }

  const oldList = `              {communityUsers.map((member) => (\n                <li key={member.id} className="community-user-card">\n                  <div className="user-avatar-name">\n                    <span className="avatar">{member.name?.charAt(0) || 'U'}</span>\n                    <div>\n                      <strong>{member.name}</strong>\n                      <span>{member.followersCount} followers</span>\n                    </div>\n                  </div>\n                  {member.isFollowing ? (\n                    <button type="button" className="btn-secondary" onClick={() => handleUnfollow(member.id)}>\n                      Following\n                    </button>\n                  ) : (\n                    <button type="button" className="btn-primary" onClick={() => handleFollow(member.id)}>\n                      Follow\n                    </button>\n                  )}\n                </li>\n              ))}`;
  const newList = `              {communityUsers.map((member) => (\n                <li key={member.id} className="community-user-card">\n                  <div className="user-avatar-name">\n                    <span className="avatar">{member.name?.charAt(0) || 'U'}</span>\n                    <div>\n                      <strong>{member.name}</strong>\n                      <span>{member.followersCount} followers</span>\n                    </div>\n                  </div>\n                  <div className="user-actions">\n                    <div className="direct-message-control">\n                      <input\n                        type="text"\n                        value={messageDrafts[member.id] || ''}\n                        onChange={(event) => handleMessageInputChange(member.id, event.target.value)}\n                        placeholder={\`Message ${member.name}…\`}\n                        className="direct-message-input"\n                      />\n                      <button\n                        type="button"\n                        className="btn-primary"\n                        onClick={() => handleSendMessage(member.id)}\n                        disabled={!messageDrafts[member.id]?.trim() || messageStatus[member.id] === 'sending'}\n                      >\n                        {messageStatus[member.id] === 'sending' ? 'Sending…' : 'Send'}\n                      </button>\n                    </div>\n                    {messageStatus[member.id] === 'sent' && <span className="message-status success">Sent</span>}\n                    {messageStatus[member.id] === 'error' && <span className="message-status error">Failed</span>}\n                    {member.isFollowing ? (\n                      <button type="button" className="btn-secondary" onClick={() => handleUnfollow(member.id)}>\n                        Following\n                      </button>\n                    ) : (\n                      <button type="button" className="btn-primary" onClick={() => handleFollow(member.id)}>\n                        Follow\n                      </button>\n                    )}\n                  </div>\n                </li>\n              ))}`;

  if (text.includes(oldList)) {
    text = text.replace(oldList, newList);
    console.log('replaced community user list with messaging UI');
  } else if (!text.includes('className="direct-message-input"')) {
    throw new Error('Community.jsx user list block not found for replacement');
  }

  fs.writeFileSync(file, text, 'utf8');
}

function patchCommunityCss() {
  const file = path.join(base, 'frontend', 'src', 'pages', 'Community.css');
  let text = fs.readFileSync(file, 'utf8');
  const extra = `\n.user-actions {\n  display: grid;\n  gap: 10px;\n  width: 100%;\n  margin-top: 12px;\n}\n.direct-message-control {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  margin-bottom: 10px;\n}\n.direct-message-input {\n  flex: 1;\n  padding: 10px 12px;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.06);\n  color: var(--text-primary);\n}\n.message-status {\n  font-size: 12px;\n  color: var(--text-secondary);\n}\n.message-status.success {\n  color: #22c55e;\n}\n.message-status.error {\n  color: #f87171;\n}\n`;
  if (!text.includes('.user-actions')) {
    text += extra;
    fs.writeFileSync(file, text, 'utf8');
    console.log('added Community.css messaging styles');
  } else {
    console.log('Community.css messaging styles already present');
  }
}

try {
  patchApi();
  patchCommunity();
  patchCommunityCss();
  console.log('all patches applied');
} catch (err) {
  console.error('ERROR:', err.message);
  process.exit(1);
}

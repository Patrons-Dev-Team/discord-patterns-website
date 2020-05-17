const permissions = {
  CREATE_INSTANT_INVITE: 1,
  KICK_MEMBERS: 2,
  BAN_MEMBERS: 4,
  ADMINISTRATOR: 8,
  MANAGE_CHANNELS: 16,
  MANAGE_GUILD: 32,
  ADD_REACTIONS: 64,
  VIEW_AUDIT_LOG: 128,
  PRIORITY_SPEAKER: 256,
  STREAM: 512,
  VIEW_CHANNEL: 1024,
  SEND_MESSAGES: 2048,
  SEND_TTS_MESSAGES: 4096,
  MANAGE_MESSAGES: 8192,
  EMBED_LINKS: 16384,
  ATTACH_FILES: 32768,
  READ_MESSAGE_HISTORY: 65536,
  MENTION_EVERYONE: 131072,
  USE_EXTERNAL_EMOJIS: 262144,
  CONNECT: 1048576,
  SPEAK: 2097152,
  MUTE_MEMBERS: 4194304,
  DEAFEN_MEMBERS: 8388608,
  MOVE_MEMBERS: 16777216,
  USE_VAD: 33554432,
  CHANGE_NICKNAME: 67108864,
  MANAGE_NICKNAMES: 134217728,
  MANAGE_ROLES: 268435456,
  MANAGE_WEBHOOKS: 536870912,
  MANAGE_EMOJIS: 1073741824
}

const permsOrder = [
  'ADMINISTRATOR',
  'VIEW_AUDIT_LOG',
  'MANAGE_GUILD',
  'MANAGE_ROLES',
  'MANAGE_CHANNELS',
  'KICK_MEMBERS',
  'BAN_MEMBERS',
  'CREATE_INSTANT_INVITE',
  'CHANGE_NICKNAME',
  'MANAGE_NICKNAMES',
  'MANAGE_EMOJIS',
  'MANAGE_WEBHOOKS',
  'VIEW_CHANNEL',
  'SEND_MESSAGES',
  'SEND_TTS_MESSAGES',
  'MANAGE_MESSAGES',
  'EMBED_LINKS',
  'ATTACH_FILES',
  'READ_MESSAGE_HISTORY',
  'MENTION_EVERYONE',
  'USE_EXTERNAL_EMOJIS',
  'ADD_REACTIONS',
  'CONNECT',
  'SPEAK',
  'STREAM',
  'MUTE_MEMBERS',
  'DEAFEN_MEMBERS',
  'MOVE_MEMBERS',
  'USE_VAD',
  'PRIORITY_SPEAKER'
]

const convertReadable = function(permName, readable = true) {
  if (!readable) return permName
  const names = {
    CREATE_INSTANT_INVITE: 'Create Instant Invite',
    KICK_MEMBERS: 'Kick Members',
    BAN_MEMBERS: 'Ban Members',
    ADMINISTRATOR: 'Administrator',
    MANAGE_CHANNELS: 'Manage Channels',
    MANAGE_GUILD: 'Manage Guild',
    ADD_REACTIONS: 'Add Reactions',
    VIEW_AUDIT_LOG: 'View Audit Log',
    PRIORITY_SPEAKER: 'Priority Speaker',
    STREAM: 'Stream',
    VIEW_CHANNEL: 'View Channel and read message',
    SEND_MESSAGES: 'Send Messages',
    SEND_TTS_MESSAGES: 'Send TTS Messages',
    MANAGE_MESSAGES: 'Manage Messages',
    EMBED_LINKS: 'Embed Links',
    ATTACH_FILES: 'Attach Files',
    READ_MESSAGE_HISTORY: 'Read Message History',
    MENTION_EVERYONE: 'Mention Everyone',
    USE_EXTERNAL_EMOJIS: 'Use External Emojis',
    CONNECT: 'Connect',
    SPEAK: 'Speak',
    MUTE_MEMBERS: 'Mute Members',
    DEAFEN_MEMBERS: 'Deafen Members',
    MOVE_MEMBERS: 'Move Members',
    USE_VAD: 'Use Voice Activity',
    CHANGE_NICKNAME: 'Change Nickname',
    MANAGE_NICKNAMES: 'Manage Nicknames',
    MANAGE_ROLES: 'Manage Roles',
    MANAGE_WEBHOOKS: 'Manage Webhooks',
    MANAGE_EMOJIS: 'Manage Emojis'
  }

  if (!names[permName]) throw new RangeError('Invalid permission given!')
  return names[permName]
}

const convertPerms = function(permNumber, options) {
  // if readableNames is set to true, use the names at Discord instead of the names of PermissionResolvables at discord.js.
  if (isNaN(Number(permNumber)))
    throw new TypeError(
      `Expected permissions number, and received ${typeof permNumber} instead.`
    )
  permNumber = Number(permNumber)
  let evaluatedPerms = {}
  for (const perm in permissions) {
    const hasPerm = Boolean(permNumber & permissions[perm])
    evaluatedPerms[
      convertReadable(perm, options.readableNames, options.debug)
    ] = hasPerm
  }
  evaluatedPerms = Object.entries(evaluatedPerms)
  if (options.ordered) {
    evaluatedPerms.sort((a, b) => {
      return permsOrder.indexOf(a[0]) - permsOrder.indexOf(b[0])
    })
  }
  return evaluatedPerms
}
module.exports = {
  convertPerms,
  convertReadable,
  permissions
}

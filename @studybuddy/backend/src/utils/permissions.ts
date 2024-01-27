import { defineAbility, subject as caslAbility } from '@casl/ability';
import { IChannel, IChannelMessage, IChannelUser } from '../models/channel';
import { HydratedDocument } from 'mongoose';

namespace PermissionsManager {
  export const subject = caslAbility

  export const ChannelUser = (user: HydratedDocument<IChannelUser>) => defineAbility((can) => {
    if (user.role === "CREATOR" || user.role === "TUTOR") {
      can('post', 'ChannelMessage')
      can('delete', "ChannelMessage")
    }
    else {
      can<IChannelMessage>('update', 'ChannelMessage', { senderId: user._id })
      can<IChannelMessage>('delete', 'ChannelMessage', { senderId: user._id })

      can<HydratedDocument<IChannelUser>>('remove', 'ChannelUser', { _id: user._id })
    }

    if (user.role === "CREATOR") {
      can('remove', "ChannelUser")
    }

    can<IChannel>('update', 'Channel', { creatorId: user._id })
    can<IChannel>('delete', 'Channel', { creatorId: user._id })
  })
}

export default PermissionsManager

export type TwitchUserDto = {
  broadcaster_type: RawTwitchBroadcastType;
  description: string;
  display_name: string;
  email: string;
  id: string;
  login: string;
  offline_image_url: string;
  profile_image_url: string;
  type: RawTwitchUserType;
  view_count: number;
};

type RawTwitchBroadcastType = 'parter' | 'affiliate' | '';

type RawTwitchUserType = 'staff' | 'admin' | 'global_mod' | '';

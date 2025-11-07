type genre = string | "art" | "correction" | "comic"|"video"|"novel"|"voice"|"music";
type extension = string | "pdf" | "txt" |"wav"|"png"|"gif"|"mp4"|"m4a"|"wav"|"mp3";
type transcoder = string | "image" | "text"|"audio"|"video";

export interface User {
  id: number;
  acceptable: boolean;
  creator: boolean;
  avatar_url: string | null;
  name: string;
  nsfw_acceptable: boolean;
  screen_name: string;
  language: string;
  header_url: string | null;
  body_size: number;
  received_works_count: number;
  received_nsfw_works_count: number;
  sent_requests_average_cancel_time: number | null;
  appeal_receivable: boolean;
  request_master_rank: number | null;
  first_requester_rank: number | null;
  sent_first_works_count: number;
  sent_public_works_count: number;
  popular_creator_rank: number;
  instruction: string;
  asct: string | null;
  description: string;
  nijie_id: number | null;
  dlsite_id: number | null;
  fanza_id: number | null;
  pixiv_id: number | null;
  booth_id: number | null;
  fantia_id: number | null;
  fanbox_id: string | null;
  skima_id: number | null;
  coconala_id: number | null;
  patreon_id: number | null;
  busy: boolean;
  url: string | null;
  wishlist_id: string | null;
  youtube_id: string | null;
  show_social_profile: boolean;
  accept_expiration_days: number;
  complete_expiration_days: number;
  nc: number;
  twitter_uid: string | null;
  user_service_links: {
    provider: string;
    screen_name: string;
  }[];
  banned: boolean;
  banned_by: string;
  complete_rate: number;
  og_image_url: string;
  skills: {
    genre: string;
    default_amount: number;
  }[];
  payment_methods: {
    credit_cards: {
      jcb: {
        nsfw: boolean;
      };
      master_card: {
        nsfw: boolean;
      };
      visa: {
        nsfw: boolean;
      };
      discover: {
        nsfw: boolean;
      };
      american_express: {
        nsfw: boolean;
      };
    };
  };
  acceptable_only_public: boolean;
  tip_acceptable: boolean;
  yearly_report_client_visible: boolean;
  total_appeals_count: number;
  received_works: miniWork[];
  sent_works: miniWork[];
  similar_creators: miniUser[];
}

interface miniWork {
  path: string;
  private_thumbnail_image_urls: {
    src: string;
    srcset: string;
  } | null;
  thumbnail_image_urls?: {
    src: string;
    srcset: string;
  };
  duration?: null;
  nsfw?: boolean;
  hardcore?: boolean;
  consored_thumbnail_image_urls?: {
    src: string;
    srcset: string;
  };
  body?: string;
  word_count?: number;
  transcoder?: transcoder;
  creator_acceptable_same_genre?: boolean;
  vtt_url?: string;
  private: boolean;
  genre: genre;
  tipped: boolean;
  creator_id: number;
  client_id: number;
  nc: number;
}

interface miniUser {
  id: number;
  creator: boolean;
  nsfw_acceptable: boolean;
  acceptable: boolean;
  name: string;
  screen_name: string;
  avatar_url: string | null;
  header_url: string | null;
  appeal_receivable: boolean;
  popular_creator_rank: number | null;
  request_master_rank: number | null;
  first_requester_rank: number | null;
  deleted_at: string | null;
  tip_acceptable_by: string | "all" | null;
  accept_expiration_days: number;
  complete_expiration_days: number;
  skills: {
    genre: genre;
  }[];
  nc: number;
}

export interface Work {
  id: number;
  path: string;
  body: string;
  nsfw: boolean;
  preview_url: string;
  og_image_url: string;
  source_body: string | null;
  translated: boolean;
  article_image_url: string;
  tag_list: string[];
  anonymous: boolean;
  genre: genre;
  extension: extension;
  duration: number | null;
  vtt_url: string | null;
  movie: boolean;
  width: number;
  height: number;
  software: string;
  size: string;
  thanks: string;
  source_thanks: string | null;
  translated_thanks: boolean;
  nc: number;
  client: miniUser;
  creator: miniUser;
  similar_works: miniWork[];
  previews: {
    id: number;
    information: {
      width: number|null;
      height: number|null;
      byte_size: number;
      duration: number | null;
      software: string | null;
      extension: extension;
      is_movie: boolean;
      transcoder: transcoder;
    };
    url: string;
    poster_url: string | null;
    vtt_url: string | null;
    }[]
};

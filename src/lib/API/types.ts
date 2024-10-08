import type { OctokitResponse } from "@octokit/types";

export type AuthenticatedUserAlias = OctokitResponse<
  | {
      login: string;
      id: number;
      node_id: string;
      avatar_url: string;
      gravatar_id: string | null;
      url: string;
      html_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      starred_url: string;
      subscriptions_url: string;
      organizations_url: string;
      repos_url: string;
      events_url: string;
      received_events_url: string;
      type: string;
      site_admin: boolean;
      name: string | null;
      company: string | null;
      blog: string | null;
      location: string | null;
      email: string | null;
      hireable: boolean | null;
      bio: string | null;
      twitter_username?: string | null | undefined;
      public_repos: number;
      public_gists: number;
      followers: number;
      following: number;
      created_at: string;
      updated_at: string;
      private_gists: number;
      total_private_repos: number;
      owned_private_repos: number;
      disk_usage: number;
      collaborators: number;
      two_factor_authentication: boolean;
      plan?:
        | {
            collaborators: number;
            name: string;
            space: number;
            private_repos: number;
          }
        | undefined;
      suspended_at?: string | null | undefined;
      business_plus?: boolean | undefined;
      ldap_dn?: string | undefined;
    }
  | {
      login: string;
      id: number;
      node_id: string;
      avatar_url: string;
      gravatar_id: string | null;
      url: string;
      html_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      starred_url: string;
      subscriptions_url: string;
      organizations_url: string;
      repos_url: string;
      events_url: string;
      received_events_url: string;
      type: string;
      site_admin: boolean;
      name: string | null;
      company: string | null;
      blog: string | null;
      location: string | null;
      email: string | null;
      hireable: boolean | null;
      bio: string | null;
      twitter_username?: string | null | undefined;
      public_repos: number;
      public_gists: number;
      followers: number;
      following: number;
      created_at: string;
      updated_at: string;
      plan?:
        | {
            collaborators: number;
            name: string;
            space: number;
            private_repos: number;
          }
        | undefined;
      suspended_at?: string | null | undefined;
      private_gists?: number | undefined;
      total_private_repos?: number | undefined;
      owned_private_repos?: number | undefined;
      disk_usage?: number | undefined;
      collaborators?: number | undefined;
    },
  200
>;

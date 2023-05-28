import { me } from "src/services/api/auth/me";

export function withAuth(callback: any) {
  return async (ctx: any) => {
    const url = ctx.req.url;

    const redirectUrl = ctx.req.url || "/";
    const encodedNextUrl = encodeURIComponent(redirectUrl);
    try {
      const token = ctx.req.cookies.token || "";
      await me({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return await callback(ctx);
    } catch (error) {
      if (!url.includes("_next")) {
        return {
          redirect: {
            destination: `/auth/login?next=${encodedNextUrl}`,
            statusCode: 302,
          },
        };
      }
    }
  };
}

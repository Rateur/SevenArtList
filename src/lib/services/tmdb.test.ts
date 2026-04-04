import { describe, it, expect, vi, beforeEach } from "vitest";
import { searchMovies, getPosterUrl } from "./tmdb";

// Mock fetch globally
global.fetch = vi.fn();

describe("TMDB Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.TMDB_TOKEN = "test-token";
  });

  describe("searchMovies", () => {
    it("should return filtered results (excluding documentaries and behind-the-scenes)", async () => {
      const mockMovies = [
        {
          id: 1,
          title: "Inception",
          genre_ids: [28, 878], // Action, Sci-Fi
          overview: "A great movie.",
        },
        {
          id: 2,
          title: "Inception: Behind the Scenes",
          genre_ids: [99], // Documentary
          overview: "How we made it.",
        },
        {
          id: 3,
          title: "Making of Inception",
          genre_ids: [28],
          overview: "A short look.",
        },
        {
          id: 4,
          title: "The Dark Knight",
          genre_ids: [28, 80],
          overview: "Another great movie.",
        },
      ];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (fetch as any).mockResolvedValue({
        ok: true,
        json: async () => ({
          page: 1,
          results: mockMovies,
          total_pages: 1,
          total_results: 4,
        }),
      });

      const response = await searchMovies("Inception");

      expect(response.results).toHaveLength(2);
      expect(response.results[0].title).toBe("Inception");
      expect(response.results[1].title).toBe("The Dark Knight");
    });

    it("should throw error if TMDB_TOKEN is missing", async () => {
      delete process.env.TMDB_TOKEN;
      await expect(searchMovies("test")).rejects.toThrow("TMDB_TOKEN is not defined");
    });
  });

  describe("getPosterUrl", () => {
    it("should return the correct full URL", () => {
      const url = getPosterUrl("/path.jpg", "w500");
      expect(url).toBe("https://image.tmdb.org/t/p/w500/path.jpg");
    });

    it("should return placeholder if no path provided", () => {
      const url = getPosterUrl(null);
      expect(url).toBe("/placeholder-movie.png");
    });
  });
});

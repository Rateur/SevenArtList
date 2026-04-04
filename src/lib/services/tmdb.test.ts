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
    it("should return filtered results based on industry standard rules", async () => {
      const mockMovies = [
        {
          id: 1,
          title: "Valid Movie",
          poster_path: "/path.jpg",
          genre_ids: [28],
          popularity: 10,
          vote_count: 5,
        },
        {
          id: 2,
          title: "No Poster",
          poster_path: null,
          genre_ids: [28],
          popularity: 10,
          vote_count: 5,
        },
        {
          id: 3,
          title: "Documentary",
          poster_path: "/path.jpg",
          genre_ids: [99],
          popularity: 10,
          vote_count: 5,
        },
        {
          id: 4,
          title: "Low Quality",
          poster_path: "/path.jpg",
          genre_ids: [28],
          popularity: 2,
          vote_count: 5,
        },
        {
          id: 5,
          title: "TV Movie",
          poster_path: "/path.jpg",
          genre_ids: [10770],
          popularity: 20,
          vote_count: 100,
        },
        {
          id: 6,
          title: "High Votes Valid",
          poster_path: "/path.jpg",
          genre_ids: [28],
          popularity: 2,
          vote_count: 50,
        },
      ];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (fetch as any).mockResolvedValue({
        ok: true,
        json: async () => ({
          page: 1,
          results: mockMovies,
          total_pages: 1,
          total_results: 6,
        }),
      });

      const response = await searchMovies("test");

      // Only "Valid Movie" (1) and "High Votes Valid" (6) should pass
      expect(response.results).toHaveLength(2);
      expect(response.results[0].title).toBe("Valid Movie");
      expect(response.results[1].title).toBe("High Votes Valid");
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

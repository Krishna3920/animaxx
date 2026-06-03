package com.animaxx.repository;

import com.animaxx.entity.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface WatchlistRepository extends JpaRepository<Watchlist, Integer> {
    Optional<Watchlist> findByUserIdAndAnimeId(
            Integer userId,
            Integer animeId);
}
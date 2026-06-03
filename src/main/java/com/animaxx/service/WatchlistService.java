package com.animaxx.service;

import com.animaxx.entity.Watchlist;
import com.animaxx.repository.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.util.List;

@Service
public class WatchlistService {

    @Autowired
    private WatchlistRepository watchlistRepository;

    public Watchlist addToWatchlist(Watchlist watchlist) {
        Optional<Watchlist> existing = watchlistRepository.findByUserIdAndAnimeId(
                watchlist.getUserId(),
                watchlist.getAnimeId());

        if (existing.isPresent()) {
            return existing.get();
        }

        return watchlistRepository.save(watchlist);
    }

    public List<Watchlist> getAllWatchlist() {
        return watchlistRepository.findAll();

    }

    public void deleteWatchlist(Integer id) {

        watchlistRepository.deleteById(id);

    }
}
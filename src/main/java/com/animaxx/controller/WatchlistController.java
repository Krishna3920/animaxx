package com.animaxx.controller;

import com.animaxx.entity.Watchlist;
import com.animaxx.service.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {

    @Autowired
    private WatchlistService watchlistService;

    @PostMapping("/add")
    public Watchlist addToWatchlist(@RequestBody Watchlist watchlist) {
        return watchlistService.addToWatchlist(watchlist);
    }

    @GetMapping("/all")
    public List<Watchlist> getAllWatchlist() {
        return watchlistService.getAllWatchlist();
    }
    @DeleteMapping("/delete/{id}")
public String deleteWatchlist(@PathVariable Integer id) {

    watchlistService.deleteWatchlist(id);

    return "Deleted Successfully";
}
}
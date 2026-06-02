package com.animaxx.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "watchlist")
public class Watchlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer watchlistId;

    private Integer userId;

    private Integer animeId;

    public Integer getWatchlistId() {
        return watchlistId;
    }

    public void setWatchlistId(Integer watchlistId) {
        this.watchlistId = watchlistId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getAnimeId() {
        return animeId;
    }

    public void setAnimeId(Integer animeId) {
        this.animeId = animeId;
    }
}
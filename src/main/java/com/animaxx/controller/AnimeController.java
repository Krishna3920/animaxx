package com.animaxx.controller;

import com.animaxx.entity.Anime;
import com.animaxx.service.AnimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/anime")
public class AnimeController {

    @Autowired
    private AnimeService animeService;

    @PostMapping("/add")
    public Anime addAnime(@RequestBody Anime anime) {
        return animeService.addAnime(anime);
    }

    @GetMapping("/all")
    public List<Anime> getAllAnime() {
        return animeService.getAllAnime();
    }
}
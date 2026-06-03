package com.animaxx.controller;

import com.animaxx.entity.Anime;
import com.animaxx.service.AnimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/anime")
public class AnimeController {
    @PutMapping("/update/{id}")
    public Anime updateAnime(@PathVariable Integer id,
            @RequestBody Anime anime) {
        return animeService.updateAnime(id, anime);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteAnime(@PathVariable Integer id) {
        animeService.deleteAnime(id);
        return "Anime deleted successfully!";
    }

    @GetMapping("/search")
    public List<Anime> searchAnime(@RequestParam String title) {
        return animeService.searchAnime(title);
    }

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
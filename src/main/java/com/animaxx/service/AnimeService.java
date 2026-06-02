package com.animaxx.service;

import com.animaxx.entity.Anime;
import com.animaxx.repository.AnimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimeService {

    @Autowired
    private AnimeRepository animeRepository;

    public Anime addAnime(Anime anime) {
        return animeRepository.save(anime);
    }

    public List<Anime> getAllAnime() {
        return animeRepository.findAll();
    }
}
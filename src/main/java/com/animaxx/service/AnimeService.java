package com.animaxx.service;

import com.animaxx.entity.Anime;
import com.animaxx.repository.AnimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimeService {
    public Anime updateAnime(Integer id, Anime updatedAnime) {

        Anime anime = animeRepository.findById(id).orElse(null);

        if (anime != null) {
            anime.setTitle(updatedAnime.getTitle());
            anime.setGenre(updatedAnime.getGenre());
            anime.setRating(updatedAnime.getRating());
            anime.setReleaseYear(updatedAnime.getReleaseYear());

            return animeRepository.save(anime);
        }

        return null;
    }

    public void deleteAnime(Integer id) {
        animeRepository.deleteById(id);
    }

    public List<Anime> searchAnime(String title) {
        return animeRepository.findByTitleContainingIgnoreCase(title);
    }

    @Autowired
    private AnimeRepository animeRepository;

    public Anime addAnime(Anime anime) {
        return animeRepository.save(anime);
    }

    public List<Anime> getAllAnime() {
        return animeRepository.findAll();
    }

}
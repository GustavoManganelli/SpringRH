package com.example.api_rh.repository;

import java.util.ArrayList;
import java.util.List;

import com.example.api_rh.model.Pessoa;

public abstract class BaseRepository<TModel extends Pessoa> {
    
    List<TModel> models = new ArrayList<>();

    public TModel addModel(TModel model) {
        if (model.getId() <= 0) {
            int nextId = models.stream()
                    .mapToInt(Pessoa::getId)
                    .max()
                    .orElse(0) + 1;
            model.setId(nextId);
        }
        models.add(model);
        return model;
    }

    public List<TModel> getAllModels() {
        return models;
    }

    public TModel getModelById(int id) {
        for (TModel model : models) {
            if (model.getId() == id) {
                return model;
            }
        }
        return null;
    }

    public TModel updateModel(int id, TModel updatedModel) {
        for (int i = 0; i < models.size(); i++) {
            if (models.get(i).getId() == id) {
                models.set(i, updatedModel);
                return models.get(i);
            }
        }
        return null;
    }

    public TModel updateStatus(int id, String status) {
        for (TModel model : models) {
            if (model.getId() == id) {
                model.setStatus(status);
                return model;
            }
        }
        return null;
    }

    public void deleteModel(int id) {
        models.removeIf(model -> model.getId() == id);
    }
}

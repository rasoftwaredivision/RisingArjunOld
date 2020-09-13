package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.FeatureDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Feature} and its DTO {@link FeatureDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FeatureMapper extends EntityMapper<FeatureDTO, Feature> {



    default Feature fromId(Long id) {
        if (id == null) {
            return null;
        }
        Feature feature = new Feature();
        feature.setId(id);
        return feature;
    }
}

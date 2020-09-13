package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.JhiauthorityDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Jhiauthority} and its DTO {@link JhiauthorityDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface JhiauthorityMapper extends EntityMapper<JhiauthorityDTO, Jhiauthority> {



    default Jhiauthority fromId(Long id) {
        if (id == null) {
            return null;
        }
        Jhiauthority jhiauthority = new Jhiauthority();
        jhiauthority.setId(id);
        return jhiauthority;
    }
}

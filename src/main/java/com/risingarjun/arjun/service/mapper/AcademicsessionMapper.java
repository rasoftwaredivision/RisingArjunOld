package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.AcademicsessionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Academicsession} and its DTO {@link AcademicsessionDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AcademicsessionMapper extends EntityMapper<AcademicsessionDTO, Academicsession> {



    default Academicsession fromId(Long id) {
        if (id == null) {
            return null;
        }
        Academicsession academicsession = new Academicsession();
        academicsession.setId(id);
        return academicsession;
    }
}

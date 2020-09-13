package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.FundamentaldetailDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Fundamentaldetail} and its DTO {@link FundamentaldetailDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FundamentaldetailMapper extends EntityMapper<FundamentaldetailDTO, Fundamentaldetail> {


    @Mapping(target = "questions", ignore = true)
    @Mapping(target = "removeQuestion", ignore = true)
    Fundamentaldetail toEntity(FundamentaldetailDTO fundamentaldetailDTO);

    default Fundamentaldetail fromId(Long id) {
        if (id == null) {
            return null;
        }
        Fundamentaldetail fundamentaldetail = new Fundamentaldetail();
        fundamentaldetail.setId(id);
        return fundamentaldetail;
    }
}

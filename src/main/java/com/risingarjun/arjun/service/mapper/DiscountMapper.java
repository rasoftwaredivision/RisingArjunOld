package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.DiscountDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Discount} and its DTO {@link DiscountDTO}.
 */
@Mapper(componentModel = "spring", uses = {EnterpriseMapper.class, AcademicsessionMapper.class})
public interface DiscountMapper extends EntityMapper<DiscountDTO, Discount> {

    @Mapping(source = "enterprise.id", target = "enterpriseId")
    @Mapping(source = "enterprise.enterprisename", target = "enterpriseEnterprisename")
    @Mapping(source = "session.id", target = "sessionId")
    @Mapping(source = "session.acadSession", target = "sessionAcadSession")
    DiscountDTO toDto(Discount discount);

    @Mapping(source = "enterpriseId", target = "enterprise")
    @Mapping(source = "sessionId", target = "session")
    Discount toEntity(DiscountDTO discountDTO);

    default Discount fromId(Long id) {
        if (id == null) {
            return null;
        }
        Discount discount = new Discount();
        discount.setId(id);
        return discount;
    }
}

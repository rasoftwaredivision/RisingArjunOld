package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.ExpenseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Expense} and its DTO {@link ExpenseDTO}.
 */
@Mapper(componentModel = "spring", uses = {EnterpriseMapper.class, EmployeeMapper.class})
public interface ExpenseMapper extends EntityMapper<ExpenseDTO, Expense> {

    @Mapping(source = "enterprise.id", target = "enterpriseId")
    @Mapping(source = "enterprise.enterprisename", target = "enterpriseEnterprisename")
    @Mapping(source = "incurredBy.id", target = "incurredById")
    @Mapping(source = "incurredBy.employeeId", target = "incurredByEmployeeId")
    ExpenseDTO toDto(Expense expense);

    @Mapping(source = "enterpriseId", target = "enterprise")
    @Mapping(source = "incurredById", target = "incurredBy")
    Expense toEntity(ExpenseDTO expenseDTO);

    default Expense fromId(Long id) {
        if (id == null) {
            return null;
        }
        Expense expense = new Expense();
        expense.setId(id);
        return expense;
    }
}

import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/blog">
      <Translate contentKey="global.menu.entities.blog" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/entry">
      <Translate contentKey="global.menu.entities.entry" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/tag">
      <Translate contentKey="global.menu.entities.tag" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/jhiauthority-my-suffix">
      <Translate contentKey="global.menu.entities.jhiauthorityMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/feature-my-suffix">
      <Translate contentKey="global.menu.entities.featureMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/roleaccess-my-suffix">
      <Translate contentKey="global.menu.entities.roleaccessMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/userdetail-my-suffix">
      <Translate contentKey="global.menu.entities.userdetailMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/userpreference-my-suffix">
      <Translate contentKey="global.menu.entities.userpreferenceMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/course-my-suffix">
      <Translate contentKey="global.menu.entities.courseMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/student-my-suffix">
      <Translate contentKey="global.menu.entities.studentMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/subject-my-suffix">
      <Translate contentKey="global.menu.entities.subjectMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/academicsession-my-suffix">
      <Translate contentKey="global.menu.entities.academicsessionMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/studentsubject-my-suffix">
      <Translate contentKey="global.menu.entities.studentsubjectMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/subjectsbasefee-my-suffix">
      <Translate contentKey="global.menu.entities.subjectsbasefeeMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/discount-my-suffix">
      <Translate contentKey="global.menu.entities.discountMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/scholarship-my-suffix">
      <Translate contentKey="global.menu.entities.scholarshipMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/studentfee-my-suffix">
      <Translate contentKey="global.menu.entities.studentfeeMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/employee-my-suffix">
      <Translate contentKey="global.menu.entities.employeeMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/center-my-suffix">
      <Translate contentKey="global.menu.entities.centerMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/centerhead-my-suffix">
      <Translate contentKey="global.menu.entities.centerheadMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/teacher-my-suffix">
      <Translate contentKey="global.menu.entities.teacherMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/teachershare-my-suffix">
      <Translate contentKey="global.menu.entities.teachershareMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/salarypayment-my-suffix">
      <Translate contentKey="global.menu.entities.salarypaymentMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/expense-my-suffix">
      <Translate contentKey="global.menu.entities.expenseMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/chapter-my-suffix">
      <Translate contentKey="global.menu.entities.chapterMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/fundamentaldetail-my-suffix">
      <Translate contentKey="global.menu.entities.fundamentaldetailMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/question-my-suffix">
      <Translate contentKey="global.menu.entities.questionMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/studentscore-my-suffix">
      <Translate contentKey="global.menu.entities.studentscoreMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/enterprise-my-suffix">
      <Translate contentKey="global.menu.entities.enterpriseMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/enterprisesettings-my-suffix">
      <Translate contentKey="global.menu.entities.enterprisesettingsMySuffix" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);

import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './chapter-my-suffix.reducer';
import { IChapterMySuffix } from 'app/shared/model/chapter-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChapterMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ChapterMySuffixDetail extends React.Component<IChapterMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { chapterEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingArjunApp.chapter.detail.title">Chapter</Translate> [<b>{chapterEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="chapterId">
                <Translate contentKey="risingArjunApp.chapter.chapterId">Chapter Id</Translate>
              </span>
            </dt>
            <dd>{chapterEntity.chapterId}</dd>
            <dt>
              <span id="chapterTitle">
                <Translate contentKey="risingArjunApp.chapter.chapterTitle">Chapter Title</Translate>
              </span>
            </dt>
            <dd>{chapterEntity.chapterTitle}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.chapter.course">Course</Translate>
            </dt>
            <dd>{chapterEntity.courseCourse ? chapterEntity.courseCourse : ''}</dd>
            <dt>
              <Translate contentKey="risingArjunApp.chapter.subject">Subject</Translate>
            </dt>
            <dd>{chapterEntity.subjectSubjectTitle ? chapterEntity.subjectSubjectTitle : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/chapter-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/chapter-my-suffix/${chapterEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ chapter }: IRootState) => ({
  chapterEntity: chapter.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChapterMySuffixDetail);

import { useEffect, useState } from "react";
import { Col, Row } from 'antd';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { Issue, Repo } from "../../types/Github";
import styles from './Kanban.module.css';
import { move, reorder } from "./kanban.utils";
import Card from "./card";
import Breadcrumbs from "./breadcrumbs/Breadcrumbs";

interface Props {
    issues: Issue[],
    repoInfo: Repo | null,
}

const Kanban = ({ issues, repoInfo }: Props) => {
    const [state, setState] = useState<Issue[][]>([[], [], []]);
    const columnTitles = ['ToDo', 'In Progress', 'Done'];

    useEffect(() => {
        const parseIssues = () => {
            const toDo: Issue[] = [];
            const done: Issue[] = [];

            issues.forEach(issue => {
                if (issue.state === 'closed') {
                    done.push(issue);
                } else {
                    toDo.push(issue)
                }
            })

            return [toDo, done];
        }

        const [toDo, done] = parseIssues();
        const inProgress: Issue[] = [];
        setState([toDo, inProgress, done])
    }, [issues])

    function onDragEnd(result: DropResult) {
        const { source, destination } = result;

        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(state[sInd], source.index, destination.index);
            const newState = [...state];
            newState[sInd] = items;
            setState(newState);
        } else {
            const result = move(state[sInd], state[dInd], source, destination);
            const newState = [...state];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            setState(newState);
        }
    }

    return (
        <section>
            <div className="container">
                <div className={styles.wrapper}>
                    {repoInfo && (
                        <Breadcrumbs repoInfo={repoInfo} />
                    )}
                    <Row gutter={16} wrap={false}>
                        <DragDropContext onDragEnd={onDragEnd}>
                            {state.map((el, ind) => (
                                <Droppable key={ind} droppableId={`${ind}`}>
                                    {(provided) => (
                                        <Col xs={24} sm={16} md={12} lg={8} className={styles.columnWrapper}>
                                            <h3 className={styles.title}>{columnTitles[ind]}</h3>
                                            <div
                                                className={styles.column}
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                {el.map((item, index) => (
                                                    <Draggable
                                                        key={item.id.toString()}
                                                        draggableId={item.id.toString()}
                                                        index={index}
                                                    >
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className={styles.cardWrapper}
                                                            >
                                                                <Card item={item} />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        </Col>
                                    )}
                                </Droppable>
                            ))}
                        </DragDropContext>
                    </Row>
                </div>
            </div>
        </section >

    );
}

export default Kanban;
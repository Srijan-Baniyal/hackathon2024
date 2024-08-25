"use client";

import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import {
    Container, CssBaseline, Typography, Grid, Paper, Button, LinearProgress, List, ListItem, 
    ListItemText, ListItemSecondaryAction, IconButton, Badge
} from '@material-ui/core';
import { Add, Done, HourglassEmpty } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#000',
        color: '#fff',
        padding: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(4),
        },
    },
    container: {
        width: '100%',
        maxWidth: '1200px',
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2, 0),
        backgroundColor: '#333',
        width: '100%',
    },
    button: {
        margin: theme.spacing(1, 0),
        width: '100%',
    },
    progress: {
        backgroundColor: '#555',
    },
    listItem: {
        backgroundColor: '#444',
        margin: theme.spacing(1, 0),
        borderRadius: '8px',
        padding: theme.spacing(1, 2),
    },
    input: {
        width: '100%',
        padding: '12px',
        marginBottom: '16px',
        color: '#fff',
        backgroundColor: '#666',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
    },
    badge: {
        marginRight: theme.spacing(1),
    },
}));

interface Task {
    name: string;
    status: 'not done' | 'in progress' | 'completed';
}

const Home: React.FC = () => {
    const classes = useStyles();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskName, setTaskName] = useState<string>('');

    // Use useEffect to load tasks from localStorage when the component mounts
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    // Update localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (status: Task['status']) => {
        if (taskName.trim()) {
            setTasks([...tasks, { name: taskName, status }]);
            setTaskName('');
        }
    };

    const updateTaskStatus = (index: number, status: Task['status']) => {
        const newTasks = tasks.map((task, i) => i === index ? { ...task, status } : task);
        setTasks(newTasks);
    };

    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const progress = (tasks.length ? (completedTasks / tasks.length) * 100 : 0);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value);
    };

    const handleAddTaskClick = (e: MouseEvent<HTMLButtonElement>) => {
        addTask('not done');
    };

    const handleUpdateTaskStatus = (index: number, status: Task['status']) => (e: MouseEvent<HTMLButtonElement>) => {
        updateTaskStatus(index, status);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6">Add Task</Typography>
                            <input
                                type="text"
                                value={taskName}
                                onChange={handleInputChange}
                                className={classes.input}
                                placeholder="Enter your task here..."
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Add />}
                                onClick={handleAddTaskClick}
                                className={classes.button}
                            >
                                Add Task
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6">Task Progress</Typography>
                            <LinearProgress variant="determinate" value={progress} className={classes.progress} />
                            <Typography variant="body1">Completed: {completedTasks} / {tasks.length}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <List>
                    {tasks.map((task, index) => (
                        <ListItem key={index} className={classes.listItem}>
                            <ListItemText 
                                primary={
                                    <Badge
                                        color={task.status === 'completed' ? 'secondary' : task.status === 'in progress' ? 'primary' : 'default'}
                                        variant="dot"
                                        className={classes.badge}
                                    >
                                        {task.name}
                                    </Badge>
                                } 
                                secondary={task.status} 
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="in-progress" onClick={handleUpdateTaskStatus(index, 'in progress')}>
                                    <HourglassEmpty style={{ color: task.status === 'in progress' ? 'yellow' : '#fff' }} />
                                </IconButton>
                                <IconButton edge="end" aria-label="done" onClick={handleUpdateTaskStatus(index, 'completed')}>
                                    <Done style={{ color: task.status === 'completed' ? 'green' : '#fff' }} />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Container>
        </div>
    );
};

export default Home;
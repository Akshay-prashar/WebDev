## Entities/Tables
User
    
    Fields:
        id
        name
        email
        updatedAt
        createdAt 

    Relationships:
        User 1:N Agent
        User 1:N ChatMessage
        User 1:N ToolConnection
        User 1:N Routine
        User 1:N RoutineExecution

Agent

    Fields:
        id
        userId
        name
        description
        instructions
        avatar
        createdAt
        updatedAt

    Relationship:
        User 1:N Agent
        Agent 1:N AgentTool
        Agent 1:N ChatMessage
        Agent 1:N Routine
    

Tool

    Fields:
        id
        name
        description
        key
        createdAt
        updatedAt

    Relationship:
        Tool 1:N ToolConnection
        Tool 1:N AgentTool

ToolConnection
    
    Fields:
        id
        userId
        toolId
        connectionData
        status
        createdAt
        updatedAt

    Relationship:
        User 1:N ToolConnection
        Tool 1:N ToolConnection

Routine

    Fields:
        id
        userId
        agentId
        goal
        instruction
        frequency
        scheduleTime
        timezone
        isActive
        nextRun
        createdAt
        updatedAt

    Relationship:
        User 1:N Routine
        Agent 1:N Routine
        Routine 1:N RoutineExecution

RoutineTool

    Fields:
        id
        routineId
        toolId
        createdAt
    Relationship:
        Routine 1:N RoutineTool
        Tool 1:N RoutineTool

ChatMessage

    Fields:
        id
        userid
        agentId
        role
        content
        createdAt 

    Relationship:
        User 1:N ChatMessage
        Agent 1:N ChatMessage


RoutineExecution

    Fields:
        id
        userId
        routineId
        status
        result
        error
        startedAt
        completedAt

    Relationship:
        User 1:N RoutineExecution
        Routine 1:N RoutineExecution

AgentTool

    Fields:
        id
        agentId
        toolId
        configuration
        createdAt
        updatedAt

    Relationships:
        Agent 1:N AgentTool
        Tool 1:N AgentTool
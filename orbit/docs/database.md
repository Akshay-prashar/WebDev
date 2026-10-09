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
        User 1:N Conversation
        User 1:N ToolConnection
        User 1:N Routine

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
        Agent 1:N Routine
        Agent 1:N Conversation

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



Conversation

    fields:
        id
        userId
        agentId
        createdAt
        updatedAt
    Relationship:
        User 1:N Conversation
        Agent 1:N Conversation
        Conversation 1:N ChatMessage


ChatMessage

    Fields:
        id
        conversationId
        role
        content
        createdAt 
        updatedAt

    Relationship:
        ChatMessage n:1 Conversation


RoutineExecution

    Fields:
        id
        routineId
        status
        result
        error
        startedAt
        completedAt
        updatedAt

    Relationship:
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


## Er Diagram


```mermaid
erDiagram

    User {
        string id PK
        string name
        string email
        datetime updatedAt
        datetime createdAt
    }

    Agent {
        string id PK
        string userId FK
        string name
        string description
        string instructions
        string avatar
        datetime createdAt
        datetime updatedAt
    }

    Tool {
        string id PK
        string name
        string description
        string key
        datetime createdAt
        datetime updatedAt
    }

    ToolConnection {
        string id PK
        string userId FK
        string toolId FK
        json connectionData
        string status
        datetime createdAt
        datetime updatedAt
    }

    Routine {
        string id PK
        string userId FK
        string agentId FK
        string goal
        string instruction
        string frequency
        string scheduleTime
        string timezone
        boolean isActive
        datetime nextRun
        datetime createdAt
        datetime updatedAt
    }

    Conversation {
        string id PK
        string userId FK
        string agentId FK
        datetime createdAt
        datetime updatedAt
    }

    ChatMessage {
        string id PK
        string conversationId FK
        string role
        text content
        datetime createdAt
        datetime updatedAt
    }

    RoutineExecution {
        string id PK
        string routineId FK
        string status
        text result
        text error
        datetime startedAt
        datetime completedAt
        datetime updatedAt
    }

    AgentTool {
        string id PK
        string agentId FK
        string toolId FK
        json configuration
        datetime createdAt
        datetime updatedAt
    }


    User ||--o{ Agent : "has"
    User ||--o{ ToolConnection : "has"
    User ||--o{ Routine : "has"
    User ||--o{ Conversation : "has"

    Agent ||--o{ AgentTool : "uses"
    Agent ||--o{ Routine : "runs"
    Agent ||--o{ Conversation : "has"

    Tool ||--o{ ToolConnection : "connected through"
    Tool ||--o{ AgentTool : "assigned through"

    Routine ||--o{ RoutineExecution : "has"

    Conversation ||--o{ ChatMessage : "contains"
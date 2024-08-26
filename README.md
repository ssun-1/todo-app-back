# Overview

This is the backend for a to do app built using Node, Express, and PostgreSQL as the database

## Installation

Run

```npm install```

to install the package dependencies

## Configuration

The connection to PostgreSQL is established using pg-promise and the connection string configured in the main file. You will need to update the constand ```db``` to point to your own PostgreSQL database table for the backend to function properly.

You can also change the port that the backend listens on by updating the ```port``` constant near the top of index.tsx as well.

## Running the back end

Run

```node index.tsx```

To activate the backend


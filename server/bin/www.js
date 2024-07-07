'use strict'
const httpServer = require('../app')
const PORT = 3001

httpServer.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`)
})
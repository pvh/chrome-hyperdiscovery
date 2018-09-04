setTimeout(() => {
  let docId = process.argv[2]

  let Hypermerge = require("./src/hypermerge/index")
  //  let storage = require("random-access-chrome-file")
  //  let storage = require('random-access-memory')

  let hm = new Hypermerge({ storage: ".data" })

  hm.once("ready", () => {
    hm.joinSwarm()

    if (!docId) {
      let doc = hm.create()
      docId = hm.getId(doc)
      console.log("created new doc", docId)
    }

    let handle = hm.openHandle(docId)

    handle.change(doc => {
      doc.updatedAt = new Date().toISOString()
    })

    console.log("HANDLE", handle)
    handle.onChange(console.log)
  })
}, 1000)

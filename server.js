const express = require('express');
const app = express();
const git = require('simple-git')();
app.use(express.json());
const PORT = 4000;
const REPO_PATH = 'H:\\Workspace\\Hadef IT\\Local-QM System\\testpull\\test-auto';
app.post('/', (req, res) => {
    const payload = req.body;
    if(payload.ref == "refs/heads/production"){
        git.cwd(REPO_PATH)
        .pull((err, update) => {
          if (err) {
            console.error('Failed to pull repository:', err);
            return res.sendStatus(500);
          }
    
          if (update && update.summary.changes) {
            console.log('Repository pulled successfully.');
            return res.sendStatus(200);
          }
          console.log('Repository is up to date.');
          return res.sendStatus(204);
        });
    }else{
        console.log('Repository is still under development.');
        return res.sendStatus(204);
    }
});
console.log("deve");
app.listen(PORT, () => {
  console.log(`Webhook server listening on port ${PORT}`);
});

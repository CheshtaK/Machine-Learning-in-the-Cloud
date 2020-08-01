import * as functions from 'firebase-functions';
import { google } from 'googleapis';
const ml = google.ml('v1')

export const predictHappiness = functions.https.onRequest(async (request, response) => {
    
    const instances = request.body.instances; 
    const model = request.body.model; 

    console.log(model);

    const { credential } = await google.auth.getApplicationDefault();
    const modelName = `projects/machine-learning-in-the-cloud/models/${model}`;

    console.log(credential);
    console.log(modelName);

    const preds = await ml.projects.predict({
        auth: credential,
        name: modelName,
        requestBody: { 
            instances
        }
    } as any);

    response.send(JSON.stringify(preds.data))

});
import path from 'path';
import process from 'process';
import nodemailer from 'nodemailer';
import cors from 'cors';
import Enqueue from 'express-enqueue';
import compression from 'compression';
import proxy from 'express-http-proxy';
import * as dotenv from 'dotenv';
import JiraApi from 'jira-client';
import express from 'express';
import { env } from './env.mjs'

let __dirname = process.cwd();
dotenv.config();
export const modules = async (app) => {
    let whitelist = []

    app.use(compression());
    app.use(express.json());

    const jira = new JiraApi({
        protocol: process.env.JIRA_protocol,
        host: process.env.JIRA_host,
        username: process.env.JIRA_username,
        password: process.env.JIRA_password,
        apiVersion: process.env.JIRA_apiVersion,
        strictSSL: process.env.JIRA_strictSSL
    });

    const queue = new Enqueue({
        concurrentWorkers: 4,
        maxSize: 200,
        timeout: 30000
    });

    console.log('__dirname', __dirname);

    app.use(await cors({ credentials: true }));
    app.use(queue.getMiddleware());

    app.use((req, res, next) => {
        console.log(`node: 'icd-11': ${req.method}: ${req.path}`);
        next();
    });

    let corsOptions = {
        origin: function (origin, callback) {
            console.log('origin', origin);
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    };

    app.use('/test', express.static(`${__dirname}/docs`));
    app.use('/checklist', express.static(`${__dirname}/services/checklist/src`));
    app.use('/json-ld', express.static(`${__dirname}/services/json-ld`));
    app.use('/rules', express.static(`${__dirname}/services/rules/src`));
    app.use('/dapp', express.static(`${__dirname}/services/dapp/src`));
    app.use('/wallet', express.static(`${__dirname}/services/wallet/src`));
    app.use('/mss', express.static(`${__dirname}/services/mss/src`));
    app.use('/welcomebook', express.static(`${__dirname}/services/welcomebook/src`));
    app.use('/mkb', express.static(`${__dirname}/services/mkb/src`));
    app.use( express.static(`${__dirname}/services/mkb/build`));
    app.use('/blockchain', express.static(`${__dirname}/services/blockchain/src`));
    app.use('/newkind', express.static(`${__dirname}/services/newkind/src`));
    app.use('/elite', express.static(`${__dirname}/services/elite/src`));
    app.use('/terminal', express.static(`${__dirname}/services/terminal/src`, {
        setHeaders: function (res, path, stat) {
            res.set('Cross-Origin-Embedder-Policy', 'require-corp');
            res.set('Cross-Origin-Opener-Policy', 'same-origin');
        }
    }));
    app.use('/database', express.static(`${__dirname}/services/database/build`));
    // app.use('/terminal', express.static(`${__dirname}/services/terminal/src`));
    app.use('/docs', express.static(`${__dirname}/services/docs/docs`));

    app.use('/template', express.static(`${__dirname}/template`));
    app.use(express.static(`${__dirname}/docs`));
    app.use('/services', express.static(`${__dirname}/services`));

    app.use('/modules', express.static(`${__dirname}/services/database/build/modules`));


    app.get(`/env.json`, async (req, res) => {
        res.status(200).sendFile(path.join(__dirname, 'env.json'))
    })

    app.get(`/env.mjs`, async (req, res) => {
        res.status(200).sendFile(path.join(__dirname, 'env.mjs'))
    })

    const dapp = env().DAPP

    console.log('DAPP: ', dapp)

    app.get(`/*`, async (req, res) => {
        // console.log('index ----- index', __dirname)
        res.status(200).sendFile(path.join(__dirname, '/docs/index.html'));
    });

    app.post(`/auth`, async (req, res) => {
        console.log('==== AUTH POST ====', req.path, req.body);
    });

    app.post(`/*`, async (req, res) => {
        console.log('==== POST ====', req.path);
    });

    app.use(queue.getErrorMiddleware());

    return app
}

export default {
    description: 'server welcomebook'
};
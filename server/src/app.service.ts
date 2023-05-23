import { Injectable } from '@nestjs/common';
var admin = require('firebase-admin');
import {
  CodePipelineClient,
  AcknowledgeJobCommand,
  ListPipelinesCommand,
  StartPipelineExecutionCommand,
  GetPipelineCommand,
  UpdatePipelineCommand,
} from '@aws-sdk/client-codepipeline';

import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  GetCommand,
} from '@aws-sdk/lib-dynamodb';

@Injectable()
export class AppService {
  region = 'ap-northeast-1';
  tableName = 'guide-infra-environment-name';
  documentClient: any;
  constructor() {
    const dynamoDBClient = new DynamoDBClient({ region: this.region });
    this.documentClient = DynamoDBDocumentClient.from(dynamoDBClient);
  }
  async configPipeline() {
    // a client can be shared by different commands.
    const client = new CodePipelineClient({ region: this.region });

    const input = {
      // ListPipelinesInput
      // nextToken: 'STRING_VALUE',
      maxResults: Number('int'),
    };
    const command = new ListPipelinesCommand(input);
    const response = await client.send(command);
    console.log(response);
    const input1 = {
      // StartPipelineExecutionInput
      name: 'pipeline-for-dev-kcmsr-test-ui', // required
    };

    const command2 = new GetPipelineCommand(input1);
    const response2 = await client.send(command2);
    console.log(
      JSON.stringify(
        response2.pipeline.stages[0].actions[0].configuration.S3ObjectKey,
      ),
    );
    response2.pipeline.stages[0].actions[0].configuration.S3ObjectKey =
      'kc-member-site-src.develop-a';
    console.log(
      JSON.stringify(
        response2.pipeline.stages[0].actions[0].configuration.S3ObjectKey,
      ),
    );
    const pipelineData = response2.pipeline;
    const artifactStore = pipelineData.artifactStore;
    const stage0 = response2.pipeline.stages[0];
    const action0 = stage0.actions[0];
    const stage1 = response2.pipeline.stages[1];
    const action1 = stage1.actions[0];
    console.log(stage0);
    console.log(action0);
    console.log(stage1);
    console.log(action1);

    const updatePipelineInput = {
      // UpdatePipelineInput
      pipeline: {
        // PipelineDeclaration
        name: pipelineData.name, // required
        roleArn: pipelineData.roleArn, // required
        artifactStore: {
          // ArtifactStore
          type: artifactStore.type, // required
          location: artifactStore.location, // required
          // encryptionKey: { // EncryptionKey
          //   id: "STRING_VALUE", // required
          //   type: "STRING_VALUE", // required
          // },
        },
        stages: [
          // PipelineStageDeclarationList // required
          {
            actions: [
              // StageActionDeclarationList // required
              {
                // ActionDeclaration
                name: stage0.name, // required
                actionTypeId: {
                  // ActionTypeId
                  category: action0.actionTypeId.category, // required
                  owner: action0.actionTypeId.owner, // required
                  provider: action0.actionTypeId.provider, // required
                  version: action0.actionTypeId.version, // required
                },
                runOrder: action0.runOrder,
                configuration: action0.configuration,
                outputArtifacts: action0.outputArtifacts,
                inputArtifacts: action0.inputArtifacts,
                roleArn: action0.roleArn,
                region: action0.region,
                namespace: action0.namespace,
              },
            ],
            name: 'Source',
          },
          {
            actions: [
              // StageActionDeclarationList // required
              {
                // ActionDeclaration
                name: stage1.name, // required
                actionTypeId: {
                  // ActionTypeId
                  category: 'Build', // required
                  owner: action1.actionTypeId.owner, // required
                  provider: action1.actionTypeId.provider, // required
                  version: action1.actionTypeId.version, // required
                },
                runOrder: action1.runOrder,
                configuration: action1.configuration,
                outputArtifacts: action1.outputArtifacts,
                inputArtifacts: action1.inputArtifacts,
                roleArn: action1.roleArn,
                region: action1.region,
                namespace: action1.namespace,
              },
            ],
            name: 'Build',
          },
        ],
      },
    };
    console.log(JSON.stringify(updatePipelineInput));

    const updatePipeline = new UpdatePipelineCommand(
      updatePipelineInput as any,
    );
    const updatePipelineResponse = await client.send(updatePipeline);
    console.log(JSON.stringify(updatePipelineResponse));

    const command1 = new StartPipelineExecutionCommand(input1);
    const response1 = await client.send(command1);
    console.log(response1);
  }
  async updateDynamoDB() {
    const params = {
      EnvName: 'develop-a',
      TargetBranch: 'develop-a',
      UpdatedAt: Date.now(),
    };
    const response = await this.update(this.tableName, params);
    console.log(response);
  }

  async scanDynamoDB() {
    const response = await this.scan(this.tableName);
    console.log(response);
  }

  async getDynamoDBItem(item: string) {
    const response = await this.get(this.tableName, item);
    console.log(response);
    return response;
  }

  async update(tableName, item) {
    const params = new PutCommand({
      TableName: tableName,
      Item: item,
    });
    return await this.documentClient.send(params);
  }

  async scan(tableName) {
    const command = new ScanCommand({
      ProjectionExpression: 'EnvName, TargetBranch, UpdatedAt',
      ExpressionAttributeNames: { '#EnvName': 'EnvName' },
      TableName: tableName,
    });

    const response = await this.documentClient.send(command);
    for (const bird of response.Items) {
      console.log(`${bird.Name} - (${bird.Color}, ${bird.AvgLifeSpan})`);
    }
    return response;
  }

  async get(tableName, key) {
    const command = new GetCommand({
      Key: {
        EnvName: key,
      },
      TableName: tableName,
    });

    const response = await this.documentClient.send(command);
    for (const bird of response.Items) {
      console.log(`${bird.Name} - (${bird.Color}, ${bird.AvgLifeSpan})`);
    }
    return response;
  }
}

# AWS DynamoDB state

## Usage


```js
const { getState, updateState } = require('@kard/dynamo-state');

config = {
  tableName: 'my-state-aws-dynamodb-table',
  memoryDal: false,
  allowCreateTable: true,
  stateIdField: 'stateId',
  eventIdField: 'actionType',
  awsLog: false,
  awsSdk: {
    region: 'eu-central-1',
  },
};

const currentState = await getState('3918d9b3-2ac1-4f1d-845b-5bcadc72853d', { config })

const reducers = {
  SET_STATE: async (state, { stateName }) => {
    return {
    	...state,
    	stateName,
    }
  }
};

const action = { 
	actionType: 'SET_STATE', 
	payload: {
		stateName: 'MY_STATE_NAME',
	}
}

const newState = await updateState(action, '3918d9b3-2ac1-4f1d-845b-5bcadc72853d', { config, reducers });


```

## Build

```sh
npm ci
npm run build
npx rimraf dist && npm run build
```

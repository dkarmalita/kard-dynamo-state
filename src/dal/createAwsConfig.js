const createAwsConfig = (config = {}) => ({
  // FIXME: (kard) - it get no value on ECO-DEMO-NL
  region: 'eu-central-1', // config.region, // 'eu-central-1',

  maxRetries: 5,
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#maxRetries-property
  // This works with DynamoDB (50ms): https://github.com/aws/aws-sdk-js/issues/1100#issuecomment-240777537

  retryDelayOptions: {
    base: 1000,
    // The base number of milliseconds to use in the exponential backoff for operation retries.
    // Defaults to 100 ms for all services except DynamoDB, where it defaults to 50ms.
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#retryDelayOptions-property
    // This doesn't work with DynamoDB: https://github.com/aws/aws-sdk-js/issues/1100#issuecomment-240777537

          customBackoff(retryCount, err) { // eslint-disable-line
      if (!err.retryable) { return -1; }
      return 100 + retryCount * 100;
      // returns delay in ms
    },
    // A custom function that accepts a retry count and error and returns the amount of time to
    // delay in milliseconds. If the result is a non-zero negative value, no further retry
    // attempts will be made. The base option will be ignored if this option is supplied.
    // The function is only called for retryable errors.
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#retryDelayOptions-property
    // This doesn't work with DynamoDB: https://github.com/aws/aws-sdk-js/issues/1100#issuecomment-240777537
  },

  httpOptions: {
    timeout: 120000,
    // The number of milliseconds a request can take before automatically being terminated. Defaults
    // to two minutes (120000).
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#httpOptions-property

    connectTimeout: 5000,
    //  Sets the socket to timeout after failing to establish a connection with the server after
    //  connectTimeout milliseconds. This timeout has no effect once a socket connection has been
    //  established.
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#httpOptions-property
  },

  logger: !config.awsLog ? {} : {
    /* eslint-disable-next-line no-console, max-len */
    // Returns an object that responds to .write() (like a stream) or .log() (like the console object)
    // in order to log information about requests
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#logger-property
    log(r) {
      console.log(r); // eslint-disable-line no-console
    },
  },
  ...config.awsSdk,
});

module.exports = createAwsConfig;

import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as wafv2 from 'aws-cdk-lib/aws-wafv2';
import { WafRules } from './waf/waf-rules';
import { WAFProps } from '../interfaces/stack/waf-stack.interface';
import { LogGroup } from 'aws-cdk-lib/aws-logs';

export class WAFStack extends cdk.Stack {
  
  public readonly waf: wafv2.CfnWebACL;

  constructor(scope: Construct, id: string, props: WAFProps) {
    super(scope, id, props);

    const rulesClient = new WafRules()
    const rules = rulesClient.generateRules();
    const webAclLogGroup = new LogGroup(scope, "awsWafLogs", {
      logGroupName: props.appName + `aws-waf-logs`
    });
  
    const waf = new wafv2.CfnWebACL(this, 'waf', {
      defaultAction: {
        allow: {}
      },
      scope: 'REGIONAL',
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: 'AWsWAFCloudwatchMetrics',
        sampledRequestsEnabled: true
      },
      name: props.appName + 'waf-cdk',
      rules: rules.map(rule => rule.Rule),

    });

    new wafv2.CfnLoggingConfiguration(scope, "webAclLoggingConfiguration", {
      logDestinationConfigs: [
        // Construct the different ARN format from the logGroupName
        cdk.Stack.of(this).formatArn({
          arnFormat: cdk.ArnFormat.COLON_RESOURCE_NAME,
          service: "logs",
          resource: "log-group",
          resourceName: webAclLogGroup.logGroupName,
        })
      ],
      resourceArn: waf.attrArn // Arn of Acl
    });
  

    this.waf = waf;
  }

}

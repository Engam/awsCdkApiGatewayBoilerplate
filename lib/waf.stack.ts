import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as wafv2 from 'aws-cdk-lib/aws-wafv2';
import { WafRules } from './waf/waf-rules';
import { WAFProps } from '../interfaces/stack/waf-stack.interface';

export class WAFStack extends cdk.Stack {
  
  public readonly waf: wafv2.CfnWebACL;

  constructor(scope: Construct, id: string, props: WAFProps) {
    super(scope, id, props);

    const rulesClient = new WafRules()
    const rules = rulesClient.generateRules();

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
      rules: rules.map(rule => rule.Rule)
    });

    this.waf = waf;
  }

}

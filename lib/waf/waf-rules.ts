import * as wafv2 from 'aws-cdk-lib/aws-wafv2';

interface WafRulesClass {
  generateRules():WafRule[]
}
export interface WafRule {
  Rule: wafv2.CfnWebACL.RuleProperty;
}

export class WafRules implements WafRulesClass {

  constructor() {

  }

  public generateRules():WafRule[] {      
    const rules = [
      this.genAWSManagedRulesAdminProtectionRuleSet(),
      this.genAWSManagedRulesAmazonIpReputationList(),
      this.genAWSManagedRulesAnonymousIpList(),
      this.genAWSManagedRulesCommonRuleSet(),
      this.genAWSManagedRulesKnownBadInputsRuleSet(),
      this.genAWSManagedRulesUnixRuleSet(),
      this.genAWSManagedRulesWindowsRuleSet(),
      this.genGeoblockPolitikkOsloAPIOutsideNorway()
    ]
    return rules;

  }

  private genGeoblockPolitikkOsloAPIOutsideNorway():WafRule {
    return {
      Rule: {
        name: "GeoblockPolitikkOsloAPIOutsideNorway",
        priority: 8,
        statement: {
          notStatement: {
            statement: {
              geoMatchStatement: {
                countryCodes: [
                  "NO"
                ]
              }
            }
          }
        },
        action: {
          block: {}
        },
        visibilityConfig: {
          sampledRequestsEnabled: true,
          cloudWatchMetricsEnabled: true,
          metricName: "GeoblockPolitikkOsloAPIOutsideNorway"
        }
      }
    }
  }

  private genAWSManagedRulesWindowsRuleSet():WafRule {
    return {
      Rule: {
        name: "AWS-AWSManagedRulesWindowsRuleSet",
        priority: 7,
        statement: {
          managedRuleGroupStatement: {
            vendorName: "AWS",
            name: "AWSManagedRulesWindowsRuleSet"
          }
        },
        overrideAction: {
          none: {}
        },
        visibilityConfig: {
          sampledRequestsEnabled: true,
          cloudWatchMetricsEnabled: true,
          metricName: "AWS-AWSManagedRulesWindowsRuleSet"
        }
      }
    }
  
  }


  private genAWSManagedRulesUnixRuleSet():WafRule {
    return {
      Rule: {
        name : "AWS-AWSManagedRulesUnixRuleSet",
        priority : 6,
        statement : {
          managedRuleGroupStatement : {
            vendorName : "AWS",
            name : "AWSManagedRulesUnixRuleSet"
          }
        },
        overrideAction : {
          none : {}
        },
        visibilityConfig : {
          sampledRequestsEnabled : true,
          cloudWatchMetricsEnabled : true,
          metricName : "AWS-AWSManagedRulesUnixRuleSet"
        }
      }
    }
  }


  private genAWSManagedRulesKnownBadInputsRuleSet():WafRule {

    return {
      Rule: {
        name: "AWS-AWSManagedRulesKnownBadInputsRuleSet",
        priority: 5,
        statement: {
          managedRuleGroupStatement: {
            vendorName: "AWS",
            name: "AWSManagedRulesKnownBadInputsRuleSet"
          }
        },
        overrideAction: {
          none: {}
        },
        visibilityConfig: {
          sampledRequestsEnabled: true,
          cloudWatchMetricsEnabled: true,
          metricName: "AWS-AWSManagedRulesKnownBadInputsRuleSet"
        }
      }
    }

  }


  private genAWSManagedRulesCommonRuleSet() {
    return {
      Rule: {
        name: "AWS-AWSManagedRulesCommonRuleSet",
        priority: 4,
        statement: {
          managedRuleGroupStatement: {
            vendorName: "AWS",
            name: "AWSManagedRulesCommonRuleSet"
          }
        },
        overrideAction: {
          none: {}
        },
        visibilityConfig: {
          sampledRequestsEnabled: true,
          cloudWatchMetricsEnabled: true,
          metricName: "AWS-AWSManagedRulesCommonRuleSet"
        }
      }
    }
  }

  private genAWSManagedRulesAnonymousIpList():WafRule {
    return {
      Rule: {
        name: "AWS-AWSManagedRulesAnonymousIpList",
        priority: 3,
        statement: {
          managedRuleGroupStatement: {
            vendorName: "AWS",
            name: "AWSManagedRulesAnonymousIpList"
          }
        },
        overrideAction: {
          none: {}
        },
        visibilityConfig: {
          sampledRequestsEnabled: true,
          cloudWatchMetricsEnabled: true,
          metricName: "AWS-AWSManagedRulesAnonymousIpList"
        }
      }
    }
  }

  private genAWSManagedRulesAmazonIpReputationList():WafRule {
    return {
      Rule: {
        name: "AWS-AWSManagedRulesAmazonIpReputationList",
        priority: 2,
        statement: {
          managedRuleGroupStatement: {
            vendorName: "AWS",
            name: "AWSManagedRulesAmazonIpReputationList"
          }
        },
        overrideAction: {
          none: {}
        },
        visibilityConfig: {
          sampledRequestsEnabled: true,
          cloudWatchMetricsEnabled: true,
          metricName: "AWS-AWSManagedRulesAmazonIpReputationList"
        }
      }
    }
  }

  private genAWSManagedRulesAdminProtectionRuleSet():WafRule {
    return {
      Rule: {
        name: "AWS-AWSManagedRulesAdminProtectionRuleSet",
        priority: 1,
        statement: {
          managedRuleGroupStatement: {
            vendorName: "AWS",
            name: "AWSManagedRulesAdminProtectionRuleSet"
          }
        },
        overrideAction: {
          none: {}
        },
        visibilityConfig: {
          sampledRequestsEnabled: true,
          cloudWatchMetricsEnabled: true,
          metricName: "AWS-AWSManagedRulesAdminProtectionRuleSet"
        }
      }
    }
  }


  // private genAWSManagedRulesBotControlRuleSet():WafRule {
  //   return {
  //     Rule: {
  //       name: "AWS-AWSManagedRulesBotControlRuleSet",
  //       priority: 0,
  //       statement: {
  //         managedRuleGroupStatement: {
  //           vendorName: "AWS",
  //           name: "AWSManagedRulesBotControlRuleSet",
  //           managedRuleGroupConfigs: [
  //             {
  //               awsManagedRulesBotControlRuleSet: {
  //                 inspectionLevel: "COMMON"
  //               }
  //             }
  //           ]
  //         }
  //       },
  //       overrideAction: {
  //         none: {}
  //       },
  //       visibilityConfig: {
  //         sampledRequestsEnabled: true,
  //         cloudWatchMetricsEnabled: true,
  //         metricName: "AWS-AWSManagedRulesBotControlRuleSet"
  //       }
  //     }
  //   }
  // }

}
//
//  NextRNViewController.m
//  PSMeiTuan
//
//  Created by 思 彭 on 2017/6/28.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "NextRNViewController.h"

@interface NextRNViewController ()

@end

@implementation NextRNViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    NSURL *jsCodeLocation = [NSURL
                             URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios"];
    RCTRootView *rootView =
    [[RCTRootView alloc] initWithBundleURL : jsCodeLocation
                         moduleName        : @"PSMeiTuan"
                         initialProperties :
     @{
       @"NameDict" : @[
           @{
             @"name" : @"思思",
             @"value": @"棒棒哒"
             },
           @{
             @"name" : @"思思sisi",
             @"value": @"嘻嘻"
             }
           ]
       }
                          launchOptions    : nil];
    self.view = rootView;
}

@end

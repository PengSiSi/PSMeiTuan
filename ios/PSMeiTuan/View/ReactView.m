//
//  ReactView.m
//  PSMeiTuan
//
//  Created by 思 彭 on 2017/6/28.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "ReactView.h"

@implementation ReactView

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    NSString * strUrl = @"http://localhost:8081/index.ios.bundle?platform=ios&dev=true";
    NSURL * jsCodeLocation = [NSURL URLWithString:strUrl];
    // 这里的moduleName一定要和下面的index.ios.js里面的注册一样
    RCTRootView * rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                         moduleName:@"ReactiOS"
                                                  initialProperties:nil
                                                      launchOptions:nil];
    
    [self addSubview:rootView];
    
    rootView.frame = self.bounds;
  }
  return self;
}

@end

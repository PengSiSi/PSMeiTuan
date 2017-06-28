//
//  PushNative.h
//  PSMeiTuan
//
//  Created by 思 彭 on 2017/6/28.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
// 导入RCTBridgeModule类，这个是react-native提供
#import <React/RCTBridge.h>

// 遵守RCTBridgeModul协议
@interface PushNative : NSObject<RCTBridgeModule>

@end

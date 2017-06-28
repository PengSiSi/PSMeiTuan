//
//  TestViewController.m
//  PSMeiTuan
//
//  Created by 思 彭 on 2017/6/28.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "TestViewController.h"
#import "NextRNViewController.h"

@interface TestViewController ()

@property (nonatomic, strong) UIButton *jumpToRNButton;

@end

@implementation TestViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.navigationItem.title = @"我是原生的页面";
    self.view.backgroundColor = [UIColor lightGrayColor];
    [self createSubViews];
  
}

- (void)viewWillAppear:(BOOL)animated {
  [super viewWillAppear:animated];
  // 由于在AppDelegate里将原生的导航都隐藏了,这里需要导航,需要设置下
  self.navigationController.navigationBar.hidden = NO;
}

- (void)viewWillDisappear:(BOOL)animated {
  [super viewWillDisappear:animated];
  // 由于在AppDelegate里将原生的导航都隐藏了,这里需要导航,需要设置下
  self.navigationController.navigationBar.hidden = YES;
}

// 创建子控件
- (void)createSubViews {
  self.jumpToRNButton = [UIButton buttonWithType:UIButtonTypeCustom];
  self.jumpToRNButton.backgroundColor = [UIColor redColor];
  self.jumpToRNButton.frame = CGRectMake(100, 100, 200, 50);
  [self.jumpToRNButton setTitle:@"跳转到RN页面" forState:UIControlStateNormal];
  [self.jumpToRNButton addTarget:self action:@selector(jumpToRNAction) forControlEvents:UIControlEventTouchUpInside];
  [self.view addSubview:self.jumpToRNButton];
}

// 原生跳转到RN页面
- (void)jumpToRNAction {
  NSLog(@"跳转...");
  NextRNViewController *nextVc = [[NextRNViewController alloc]init];
  [self.navigationController pushViewController:nextVc animated:YES];
  
}

@end

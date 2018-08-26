#!/usr/bin/env bash
export PATH=$PATH:/Users/dengbo/Development/maven/bin:/Users/dengbo/Development/ant/bin

scp ../qcloud-service-impl/target/qcloud-service-impl-1.0.0.jar t001:/data1/qcloud-service/deploy/qcloud-service.jar
scp ../qcloud-service-impl/target/lib/*.* t001:/data1/qcloud-service/deploy/lib

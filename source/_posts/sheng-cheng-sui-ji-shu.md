---
title: Rust  Rand生成随机数
date: 2022-07-10 10:48:00
---

```bash
# in project file
cargo add rand
```

```rust
extern crate rand;
use rand::Rng;
fn main() {
let mut rng = rand::thread_rng();

// an unbiased integer over the entire range:
let i: i32 = rng.gen();
println!("i = {i}");

// a uniformly distributed value between 0 and 1:
let x: f64 = rng.gen();
println!("x = {x}");

// simulate rolling a die:
// 生成指定范围的随机数
println!("roll = {}", rng.gen_range(1..=6));
}
```
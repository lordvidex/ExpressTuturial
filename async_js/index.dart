Future<String> async1() async {
  return await Future.delayed(Duration(seconds: 2), () => '1');
}

Future<String> async2() async {
  return await Future.delayed(Duration(seconds: 2), () => '2');
}

Future<String> async3() async {
  return await Future.delayed(Duration(seconds: 2), () => '3');
}

void main(List<String> args) async {
  // equivalent of parallel promises in dart
  final result = await Future.wait([async1(), async2(),async3()]);
  print(result);
}

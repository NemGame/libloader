#include <iostream>
#include <conio.h>

using namespace std;

string input(string pre = "", string post = "\n") {
	cout << pre;
	char ch;
	string out = "";
	while (1) {
		ch = _getch();
		if (ch == 13) break;
		if (ch == 8) {
			if (out.length() > 0) {
				out.pop_back();
				cout << "\b \b";
			}
			continue;
		}
		if (ch == 9) continue;
		if (ch == 27) continue;
		out.push_back(ch);
		cout << ch;
	}
	cout << post;
	return out;
}

long inputLong(string pre = "", string post = "\n") {
	string out = input(pre, post);
  return out.empty() ? 0 : strtol(out.c_str(), NULL, 10);
}

int inputInt(string pre = "", string post = "\n") {
  return inputLong(pre, post);
}

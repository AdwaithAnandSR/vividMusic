#include <stdio.h>

int main() {
   int d1,
   d2;
   printf("Enter max degree of 1st polynomial: ");
   scanf("%d", &d1);
   printf("Enter max degree of 2nd polynomial: ");
   scanf("%d", &d2);

   int arr1[d1 + 1],
   arr2[d2 + 1],
   result[d1 > d2 ? d1 + 1: d2 + 1];
   int max = d1 > d2 ? d1: d2;

   printf("Enter the elements of 1st polynomial: ");
   for (int i = 0; i <= d1; i++)
   scanf("%d", &arr1[i]);


   printf("Enter the elements of 2nd polynomial: ");
   for (int i = 0; i <= d2; i++)
   scanf("%d", &arr2[i]);


   for (int i = 0; i <= max; i++)
   result[i] = 0;


   for (int i = 0; i <= d1; i++)
   result[i] += arr1[i];


   for (int i = 0; i <= d2; i++)
   result[i] += arr2[i];


   printf("Printing result: ");
   int flag = 0;
   for (int i = max; i >= 0; i--)
   if (result[i] != 0) {
      if (flag && result[i] > 0)
      printf("+ ");

      if (i == 0)
      printf("%d ", result[i]);
      else if (i == 1)
      printf("%dx ", result[i]);
      else
      printf("%dx^%d ", result[i], i);

      flag = 1;
   }

   printf("= 0\n");
   return 0;
}
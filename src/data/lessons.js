export const MODULES = [
  {
    id: 'intro',
    title: 'Introduction to Flowcharts',
    items: [
      {
        id: 'what-is',
        type: 'lesson',
        title: 'What is a Flowchart?',
        content: [
          { type: 'para', text: 'A flowchart is a diagram that shows the steps of a process in order, using standard shapes connected by arrows. Flowcharts make it easier to understand, plan, and communicate how something works — whether that is baking a cake or running a computer program.' },
          { type: 'para', text: 'They are used by engineers, developers, business analysts, and students to think through problems before writing any code. A well-drawn flowchart reveals logic errors and missing steps that are easy to miss in plain text.' },
          { type: 'tip', text: 'A flowchart describes WHAT happens and in what ORDER — not how it is coded. You can draw a flowchart for any process, not just computing ones.' },
        ],
      },
      {
        id: 'symbols',
        type: 'lesson',
        title: 'Standard Symbols',
        content: [
          { type: 'para', text: 'Every shape in a flowchart has a specific meaning. Using the correct shape makes your diagram instantly understandable to anyone who knows the standard.' },
          { type: 'symbol-table', rows: [
            { name: 'Terminal', shape: 'rounded-rect', meaning: 'Marks the START or END of a process. Every flowchart must have exactly one Start and at least one End.' },
            { name: 'Process', shape: 'rect', meaning: 'A single action or step — e.g. "Add 1 to counter", "Read input", "Display result".' },
            { name: 'Sub-Process', shape: 'subprocess', meaning: 'A step that calls a separate, pre-defined process. The double vertical bars indicate it is defined elsewhere.' },
            { name: 'Decision', shape: 'diamond', meaning: 'A Yes/No or True/False question. Always has exactly two exit arrows, each labelled with the answer.' },
            { name: 'Input / Output', shape: 'parallelogram', meaning: 'Data entering (input) or leaving (output) the process — e.g. reading from a user or printing a result.' },
            { name: 'Connector', shape: 'circle', meaning: 'Used to continue a flowchart on another page or to avoid crossing arrows. Label matching connectors with the same letter.' },
          ]},
          { type: 'tip', text: 'In this app, drag any shape from the Symbols panel on the left onto the canvas. Double-click a shape to add a label.' },
        ],
      },
      {
        id: 'good-practice',
        type: 'lesson',
        title: 'Good Flowchart Practice',
        content: [
          { type: 'para', text: 'Following these conventions will make your flowcharts clear and professional:' },
          { type: 'list', items: [
            'Flow should generally go top-to-bottom and left-to-right.',
            'Every Decision diamond must have exactly two labelled exit arrows (Yes/No or True/False).',
            'Every flowchart must start with a Terminal ("Start") and end with a Terminal ("End").',
            'Keep labels short and clear — use action verbs for Process boxes (e.g. "Calculate total", not "Total").',
            'Avoid crossing arrows where possible. Use a Connector symbol if needed.',
            'Only one entry point per shape (arrows in) but multiple exit points are allowed on a Decision.',
          ]},
          { type: 'tip', text: 'Ask yourself: if someone had never seen this process before, could they follow your flowchart and carry out the steps correctly?' },
        ],
      },
    ],
  },

  {
    id: 'everyday',
    title: 'Everyday Processes',
    items: [
      {
        id: 'tea',
        type: 'task',
        title: 'Task: Making a Cup of Tea',
        objective: 'Draw a flowchart for the process of making a cup of tea, including the decision of whether to add milk and/or sugar.',
        difficulty: 'Starter',
        content: [
          { type: 'para', text: 'This is a great first flowchart because the process is familiar and has a natural decision point. Think about every step, no matter how small.' },
          { type: 'heading', text: 'Steps to consider' },
          { type: 'list', items: [
            'Boil the kettle',
            'Put a teabag in the cup',
            'Pour boiling water into the cup',
            'Wait for the tea to brew, then remove the teabag',
            'Does the person want milk? → Yes: add milk',
            'Does the person want sugar? → Yes: add sugar and stir',
            'Serve the tea',
          ]},
          { type: 'tip', text: 'Use a Terminal for Start/End, Process boxes for actions, and Decision diamonds for the milk and sugar choices.' },
        ],
        hints: [
          'You will need at least two Decision diamonds — one for milk and one for sugar.',
          'Both Yes and No paths from each decision must eventually rejoin and lead to "Serve the tea".',
          'Your flowchart should have a single Start and a single End terminal.',
        ],
      },
      {
        id: 'crossing-road',
        type: 'task',
        title: 'Task: Crossing the Road',
        objective: 'Draw a flowchart for how to cross a road safely at a pedestrian crossing with traffic lights.',
        difficulty: 'Starter',
        content: [
          { type: 'para', text: 'Road crossing has a loop — you wait and check again until the signal is safe. This introduces the idea of repeating a check.' },
          { type: 'heading', text: 'Steps to consider' },
          { type: 'list', items: [
            'Approach the crossing and press the button',
            'Wait',
            'Is the green man showing? → No: wait again (loop back)',
            'Is the road clear? → No: wait (loop back)',
            'Cross the road',
            'Reach the other side',
          ]},
          { type: 'tip', text: 'The loop (checking again and again) is one of the most important ideas in computing. Your flowchart\'s "No" arrow should point back to an earlier step.' },
        ],
        hints: [
          'The "No" exit from your decision should loop back — not go forward.',
          'You may need two decision diamonds: one for the signal, one for traffic.',
        ],
      },
      {
        id: 'login',
        type: 'task',
        title: 'Task: Logging In to a Website',
        objective: 'Draw a flowchart for a website login process. The user gets up to 3 attempts before being locked out.',
        difficulty: 'Beginner',
        content: [
          { type: 'para', text: 'This task combines input, decisions, and a counted loop — all core programming concepts.' },
          { type: 'heading', text: 'Steps to consider' },
          { type: 'list', items: [
            'Start on the login page',
            'User enters username and password',
            'Are the credentials correct? → Yes: grant access → End',
            'No: increment the attempt counter',
            'Have there been 3 or more failed attempts? → Yes: lock account → End',
            'No: show an error message, loop back to enter credentials again',
          ]},
          { type: 'tip', text: 'You will need a variable to track how many attempts have been made. Show it being set to 0 at the start and increased by 1 after each failure.' },
        ],
        hints: [
          'Use an Input/Output shape when the user enters their credentials.',
          'Use an Input/Output shape when displaying error messages.',
          'You need a process box to increment (add 1 to) the attempt counter.',
          'There are two separate decision diamonds: one for correct credentials, one for the attempt count.',
        ],
      },
      {
        id: 'vending',
        type: 'task',
        title: 'Task: Vending Machine',
        objective: 'Draw a flowchart for a vending machine — from inserting money to dispensing (or not dispensing) a product.',
        difficulty: 'Beginner',
        content: [
          { type: 'para', text: 'A vending machine is a great example of a real-world system with multiple decision points and different end states.' },
          { type: 'heading', text: 'Steps to consider' },
          { type: 'list', items: [
            'Display available items and prices',
            'User inserts money',
            'User selects an item',
            'Is the item in stock? → No: refund money → End',
            'Is the inserted amount ≥ the item price? → No: ask for more money (or cancel and refund)',
            'Yes: dispense the item',
            'Calculate and return any change',
          ]},
        ],
        hints: [
          'Think about what happens in each failure case — these are important End states too.',
          'The stock check should come before the price check (no point asking for money if there is nothing to sell).',
        ],
      },
    ],
  },

  {
    id: 'loops',
    title: 'Loops and Repetition',
    items: [
      {
        id: 'loops-intro',
        type: 'lesson',
        title: 'Loops in Flowcharts',
        content: [
          { type: 'para', text: 'A loop occurs when the flow of a flowchart returns to an earlier point. Loops are how flowcharts represent repetition — doing something "while" a condition is true, or "until" a condition becomes true.' },
          { type: 'heading', text: 'Two common loop patterns' },
          { type: 'list', items: [
            'Pre-condition loop (WHILE): check first, then do the action. If the condition is false from the start, the action never happens.',
            'Post-condition loop (REPEAT…UNTIL): do the action first, then check. The action always happens at least once.',
          ]},
          { type: 'para', text: 'In a flowchart, a loop is formed when a "No" arrow from a Decision points back upward to an earlier Process or Decision box.' },
          { type: 'tip', text: 'Infinite loops — where the condition is never met — are a common bug. Always ask: "What will eventually make the loop stop?"' },
        ],
      },
      {
        id: 'countdown',
        type: 'task',
        title: 'Task: Countdown from 10',
        objective: 'Draw a flowchart that counts down from 10 to 1, displaying each number, then displays "Blast off!".',
        difficulty: 'Beginner',
        content: [
          { type: 'para', text: 'This is the classic loop example. You need a variable to hold the current count, a loop to keep going while it is above zero, and an output at the end.' },
          { type: 'heading', text: 'Steps to consider' },
          { type: 'list', items: [
            'Set count = 10',
            'Is count > 0? → No: display "Blast off!" → End',
            'Yes: display count',
            'Subtract 1 from count',
            'Go back to the decision',
          ]},
        ],
        hints: [
          'The very first box after Start should be a Process that sets count = 10.',
          'This is a pre-condition (WHILE) loop — the check comes before the display.',
        ],
      },
      {
        id: 'sum-input',
        type: 'task',
        title: 'Task: Sum Numbers Until Zero',
        objective: 'Draw a flowchart that repeatedly asks the user to enter a number, adding each to a running total, and stops and displays the total when the user enters 0.',
        difficulty: 'Intermediate',
        content: [
          { type: 'para', text: 'This is an indefinite loop — you do not know in advance how many times it will run. The user controls when it stops.' },
          { type: 'heading', text: 'Steps to consider' },
          { type: 'list', items: [
            'Set total = 0',
            'Ask user to enter a number',
            'Read the number',
            'Is number = 0? → Yes: display total → End',
            'No: add number to total',
            'Loop back to ask for the next number',
          ]},
          { type: 'tip', text: 'Notice this is a post-condition style loop — the user must enter at least one number before the check happens. The input comes before the decision.' },
        ],
        hints: [
          'Use an Input/Output shape for "Ask user to enter a number" and for "Display total".',
          'The "add number to total" step must come AFTER the zero check, or you would add 0 to the total.',
        ],
      },
      {
        id: 'times-table',
        type: 'task',
        title: 'Task: Print a Times Table',
        objective: 'Draw a flowchart that asks the user which times table they want, then prints all multiples from 1× to 12×.',
        difficulty: 'Intermediate',
        content: [
          { type: 'para', text: 'A counted loop — you know exactly how many times it will run (12 times). You need a counter variable and a condition to stop at 12.' },
          { type: 'heading', text: 'Steps to consider' },
          { type: 'list', items: [
            'Ask user to enter a number (the table)',
            'Set multiplier = 1',
            'Is multiplier > 12? → Yes: End',
            'Calculate result = number × multiplier',
            'Display "number × multiplier = result"',
            'Add 1 to multiplier',
            'Loop back to the decision',
          ]},
        ],
        hints: [
          'The multiplier starts at 1, not 0.',
          'The loop runs while multiplier ≤ 12, so exit when multiplier > 12.',
        ],
      },
    ],
  },

  {
    id: 'searching',
    title: 'Searching Algorithms',
    items: [
      {
        id: 'search-intro',
        type: 'lesson',
        title: 'What is a Searching Algorithm?',
        content: [
          { type: 'para', text: 'A searching algorithm finds a target value within a collection of data (such as a list or array). Searching is one of the most fundamental operations in computing — databases, web search, spell checkers, and sat-navs all rely on efficient searching.' },
          { type: 'para', text: 'The two algorithms you need to know for T-Level are:' },
          { type: 'list', items: [
            'Linear Search (also called Sequential Search) — simple but slow for large data sets.',
            'Binary Search — much faster, but only works on sorted data.',
          ]},
          { type: 'tip', text: 'When comparing algorithms, computer scientists use "Big O" notation. Linear search is O(n) — time grows with the list size. Binary search is O(log n) — much faster for large lists.' },
        ],
      },
      {
        id: 'linear-search-lesson',
        type: 'lesson',
        title: 'Linear Search — How it Works',
        content: [
          { type: 'para', text: 'Linear search examines each element in a list one by one, starting from the first, until the target is found or the end of the list is reached.' },
          { type: 'heading', text: 'Example' },
          { type: 'para', text: 'List: [14, 3, 27, 9, 51, 6]   Target: 9' },
          { type: 'list', items: [
            'Check index 0: 14 ≠ 9 → move on',
            'Check index 1: 3 ≠ 9 → move on',
            'Check index 2: 27 ≠ 9 → move on',
            'Check index 3: 9 = 9 → FOUND at position 3',
          ]},
          { type: 'para', text: 'If the target is not in the list, every element is checked before confirming "not found". In the worst case, this is n comparisons for a list of n items.' },
          { type: 'tip', text: 'Linear search works on unsorted lists. This is its main advantage over binary search.' },
          { type: 'code', label: 'Pseudocode', text:
`FUNCTION linearSearch(list, target)
  FOR i = 0 TO LEN(list) - 1
    IF list[i] = target THEN
      RETURN i
    END IF
  END FOR
  RETURN -1  // not found
END FUNCTION` },
        ],
      },
      {
        id: 'linear-search-task',
        type: 'task',
        title: 'Task: Chart a Linear Search',
        objective: 'Draw a flowchart for a linear search that takes a list and a target value as input and either returns the position of the target or reports "Not found".',
        difficulty: 'Intermediate',
        content: [
          { type: 'heading', text: 'Steps to consider' },
          { type: 'list', items: [
            'Input: list and target value',
            'Set index = 0',
            'Is index ≥ length of list? → Yes: output "Not found" → End',
            'Does list[index] = target? → Yes: output index (position found) → End',
            'No: add 1 to index',
            'Loop back to the bounds check',
          ]},
          { type: 'tip', text: 'Order matters: check the bounds (end of list) BEFORE checking the current element, to avoid accessing a position that does not exist.' },
        ],
        hints: [
          'There are two separate Decision diamonds — one for "end of list?" and one for "element matches?".',
          'Both successful (found) and unsuccessful (not found) paths lead to an End terminal.',
          'The index counter must be reset to 0 before the loop begins.',
        ],
      },
      {
        id: 'binary-search-lesson',
        type: 'lesson',
        title: 'Binary Search — How it Works',
        content: [
          { type: 'para', text: 'Binary search only works on a sorted list. It works by repeatedly halving the search range until the target is found or the range is empty.' },
          { type: 'heading', text: 'Example' },
          { type: 'para', text: 'Sorted list: [3, 6, 9, 14, 27, 51]   Target: 9' },
          { type: 'list', items: [
            'low = 0, high = 5, mid = 2 → list[2] = 9 = target → FOUND',
          ]},
          { type: 'para', text: 'A larger example — Target: 6' },
          { type: 'list', items: [
            'low=0, high=5, mid=2 → list[2]=9 > 6 → search LEFT half: high = mid-1 = 1',
            'low=0, high=1, mid=0 → list[0]=3 < 6 → search RIGHT half: low = mid+1 = 1',
            'low=1, high=1, mid=1 → list[1]=6 = 6 → FOUND at index 1',
          ]},
          { type: 'tip', text: 'With 1 million items, linear search may need 1,000,000 comparisons. Binary search needs at most 20. That is the power of O(log n).' },
          { type: 'code', label: 'Pseudocode', text:
`FUNCTION binarySearch(list, target)
  low = 0
  high = LEN(list) - 1
  WHILE low <= high
    mid = (low + high) DIV 2
    IF list[mid] = target THEN
      RETURN mid
    ELSE IF list[mid] < target THEN
      low = mid + 1
    ELSE
      high = mid - 1
    END IF
  END WHILE
  RETURN -1  // not found
END FUNCTION` },
        ],
      },
      {
        id: 'binary-search-task',
        type: 'task',
        title: 'Task: Chart a Binary Search',
        objective: 'Draw a flowchart for a binary search algorithm on a sorted list. Return the index of the target value, or -1 if not found.',
        difficulty: 'Intermediate',
        content: [
          { type: 'heading', text: 'Steps to consider' },
          { type: 'list', items: [
            'Input: sorted list and target value',
            'Set low = 0, high = length − 1',
            'Is low > high? → Yes: output "Not found" (-1) → End',
            'Calculate mid = (low + high) ÷ 2 (integer division)',
            'Is list[mid] = target? → Yes: output mid → End',
            'Is list[mid] < target? → Yes: set low = mid + 1 → loop back',
            'No (list[mid] > target): set high = mid − 1 → loop back',
          ]},
          { type: 'tip', text: 'The Decision diamond for "list[mid] < target" has three possible logical outcomes (less, equal, greater), but in a flowchart we handle them with two diamonds — one for "equal" first, then one for "less or greater".' },
        ],
        hints: [
          'You need three Decision diamonds: "low > high?", "list[mid] = target?", "list[mid] < target?".',
          'The "Yes" from "list[mid] < target?" updates low; the "No" from it updates high.',
          'Both updates loop back to the "low > high?" check at the top of the loop.',
        ],
      },
    ],
  },

  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    items: [
      {
        id: 'sort-intro',
        type: 'lesson',
        title: 'What is a Sorting Algorithm?',
        content: [
          { type: 'para', text: 'A sorting algorithm arranges items in a list into a defined order (usually ascending or descending). Sorted data is far easier and faster to search, display, and process.' },
          { type: 'para', text: 'You need to know three comparison-based sorting algorithms for T-Level:' },
          { type: 'list', items: [
            'Bubble Sort — simple but inefficient. Good for understanding the concept.',
            'Insertion Sort — efficient on small or nearly-sorted lists.',
            'Selection Sort — minimal swaps, consistent performance.',
          ]},
          { type: 'tip', text: 'All three are O(n²) in the worst case, meaning they are not suitable for very large data sets. Real systems use algorithms like Merge Sort (O(n log n)) for large lists.' },
        ],
      },
      {
        id: 'bubble-lesson',
        type: 'lesson',
        title: 'Bubble Sort — How it Works',
        content: [
          { type: 'para', text: 'Bubble sort makes repeated passes through a list. On each pass it compares adjacent pairs of elements and swaps them if they are in the wrong order. After each pass, the largest unsorted element has "bubbled" to its correct position at the end.' },
          { type: 'heading', text: 'Example — one pass' },
          { type: 'para', text: 'List: [5, 3, 8, 1]' },
          { type: 'list', items: [
            'Compare 5 and 3 → swap → [3, 5, 8, 1]',
            'Compare 5 and 8 → no swap → [3, 5, 8, 1]',
            'Compare 8 and 1 → swap → [3, 5, 1, 8]  ← 8 is now in place',
          ]},
          { type: 'para', text: 'After each pass the number of comparisons reduces by one (since the end is already sorted). A flag can be used to detect when no swaps occurred — the list is already sorted and we can stop early.' },
          { type: 'code', label: 'Pseudocode', text:
`PROCEDURE bubbleSort(list)
  n = LEN(list)
  REPEAT
    swapped = FALSE
    FOR i = 0 TO n - 2
      IF list[i] > list[i+1] THEN
        SWAP(list[i], list[i+1])
        swapped = TRUE
      END IF
    END FOR
    n = n - 1
  UNTIL swapped = FALSE
END PROCEDURE` },
        ],
      },
      {
        id: 'bubble-task',
        type: 'task',
        title: 'Task: Chart Bubble Sort',
        objective: 'Draw a flowchart for bubble sort with the early-exit optimisation (stop when a full pass makes no swaps).',
        difficulty: 'Advanced',
        content: [
          { type: 'heading', text: 'Steps to consider' },
          { type: 'list', items: [
            'Input: list of n items',
            'Outer loop: REPEAT until no swaps made in a pass',
            '  Set swapped = False',
            '  Set i = 0',
            '  Inner loop condition: Is i ≤ n − 2?',
            '  Is list[i] > list[i+1]? → Yes: swap them, set swapped = True',
            '  Add 1 to i → loop back to inner condition',
            '  (After inner loop) Is swapped = False? → Yes: End',
            '  No: loop back to start of outer loop',
          ]},
          { type: 'tip', text: 'Nested loops in flowcharts look complex but follow the same rules — the inner loop is just a complete sub-flowchart that the outer loop calls repeatedly.' },
        ],
        hints: [
          'You need two loops — an outer REPEAT-UNTIL loop and an inner FOR loop.',
          'The "swapped" flag must be reset to False at the start of EACH pass (inside the outer loop).',
          'n can optionally decrease by 1 each outer iteration as an optimisation.',
        ],
      },
      {
        id: 'insertion-lesson',
        type: 'lesson',
        title: 'Insertion Sort — How it Works',
        content: [
          { type: 'para', text: 'Insertion sort builds a sorted section at the front of the list, one element at a time. Each new element is "inserted" into its correct position within the already-sorted section.' },
          { type: 'heading', text: 'Example' },
          { type: 'para', text: 'List: [5, 3, 8, 1]' },
          { type: 'list', items: [
            'Start: sorted section = [5]',
            'Take 3: 3 < 5 → shift 5 right → insert 3 → [3, 5, 8, 1]',
            'Take 8: 8 > 5 → already in place → [3, 5, 8, 1]',
            'Take 1: shift 8, 5, 3 right → insert 1 at position 0 → [1, 3, 5, 8]',
          ]},
          { type: 'code', label: 'Pseudocode', text:
`PROCEDURE insertionSort(list)
  FOR i = 1 TO LEN(list) - 1
    key = list[i]
    j = i - 1
    WHILE j >= 0 AND list[j] > key
      list[j+1] = list[j]
      j = j - 1
    END WHILE
    list[j+1] = key
  END FOR
END PROCEDURE` },
        ],
      },
      {
        id: 'insertion-task',
        type: 'task',
        title: 'Task: Chart Insertion Sort',
        objective: 'Draw a flowchart for insertion sort. Show how each element is taken from the unsorted section and placed into its correct position in the sorted section.',
        difficulty: 'Advanced',
        content: [
          { type: 'heading', text: 'Steps to consider' },
          { type: 'list', items: [
            'Set i = 1 (outer loop starts at second element)',
            'Is i ≥ length? → Yes: End (list is sorted)',
            'Set key = list[i]',
            'Set j = i − 1',
            'Is j ≥ 0 AND list[j] > key? → Yes: shift list[j] to list[j+1], subtract 1 from j → loop back to inner condition',
            'No: place key at list[j+1]',
            'Add 1 to i → loop back to outer condition',
          ]},
        ],
        hints: [
          'key holds the element being inserted — it must be saved before shifting begins, because shifting overwrites values.',
          'The inner loop condition has TWO parts joined with AND — both must be true to continue shifting.',
          'After the inner loop, the key goes into list[j+1], not list[j].',
        ],
      },
      {
        id: 'selection-lesson',
        type: 'lesson',
        title: 'Selection Sort — How it Works',
        content: [
          { type: 'para', text: 'Selection sort divides the list into a sorted section (at the start) and an unsorted section. In each pass it scans the unsorted section to find the smallest element, then swaps it into the next position of the sorted section.' },
          { type: 'heading', text: 'Example' },
          { type: 'para', text: 'List: [5, 3, 8, 1]' },
          { type: 'list', items: [
            'Pass 1: smallest in [5,3,8,1] is 1 (at index 3) → swap with index 0 → [1, 3, 8, 5]',
            'Pass 2: smallest in [3,8,5] is 3 (at index 1) → already in place → [1, 3, 8, 5]',
            'Pass 3: smallest in [8,5] is 5 (at index 3) → swap with index 2 → [1, 3, 5, 8]',
            'Done.',
          ]},
          { type: 'tip', text: 'Selection sort makes at most n−1 swaps, making it efficient when writes (swaps) are expensive — for example, writing to flash memory.' },
          { type: 'code', label: 'Pseudocode', text:
`PROCEDURE selectionSort(list)
  FOR i = 0 TO LEN(list) - 2
    minIndex = i
    FOR j = i+1 TO LEN(list) - 1
      IF list[j] < list[minIndex] THEN
        minIndex = j
      END IF
    END FOR
    IF minIndex ≠ i THEN
      SWAP(list[i], list[minIndex])
    END IF
  END FOR
END PROCEDURE` },
        ],
      },
      {
        id: 'selection-task',
        type: 'task',
        title: 'Task: Chart Selection Sort',
        objective: 'Draw a flowchart for selection sort. Show the outer pass loop, the inner scan for the minimum, and the conditional swap.',
        difficulty: 'Advanced',
        content: [
          { type: 'heading', text: 'Steps to consider' },
          { type: 'list', items: [
            'Set i = 0 (outer loop)',
            'Is i ≥ length − 1? → Yes: End',
            'Set minIndex = i',
            'Set j = i + 1 (inner loop)',
            'Is j ≥ length? → No: Is list[j] < list[minIndex]? → Yes: set minIndex = j',
            'Add 1 to j → loop back to inner condition',
            'Is minIndex ≠ i? → Yes: swap list[i] and list[minIndex]',
            'Add 1 to i → loop back to outer condition',
          ]},
        ],
        hints: [
          'minIndex stores the index of the smallest item found so far — it starts as i (assume the current position is already the minimum).',
          'The swap only happens if a smaller item was actually found (minIndex ≠ i).',
          'There are two nested loops, just like bubble sort.',
        ],
      },
    ],
  },

  {
    id: 'advanced',
    title: 'Advanced Algorithms (T-Level)',
    items: [
      {
        id: 'recursion-lesson',
        type: 'lesson',
        title: 'Recursion',
        content: [
          { type: 'para', text: 'Recursion is when a function calls itself as part of its own definition. Each call works on a smaller version of the problem, until a "base case" is reached that can be solved directly.' },
          { type: 'para', text: 'A recursive flowchart shows the function calling itself — represented by a Sub-Process shape pointing back into the same process.' },
          { type: 'heading', text: 'Two essential parts of any recursive function' },
          { type: 'list', items: [
            'Base case: the condition under which the function stops calling itself and returns a direct result.',
            'Recursive case: the call to itself with a simpler input, moving toward the base case.',
          ]},
          { type: 'tip', text: 'Without a base case, recursion continues forever — a "stack overflow" error. Always define the base case first.' },
          { type: 'code', label: 'Factorial — Pseudocode', text:
`FUNCTION factorial(n)
  IF n = 0 THEN
    RETURN 1        // base case
  ELSE
    RETURN n * factorial(n - 1)   // recursive case
  END IF
END FUNCTION` },
        ],
      },
      {
        id: 'factorial-task',
        type: 'task',
        title: 'Task: Chart Factorial (Recursive)',
        objective: 'Draw a flowchart for a recursive factorial function. Show the base case and the recursive call.',
        difficulty: 'Advanced',
        content: [
          { type: 'heading', text: 'Steps to consider' },
          { type: 'list', items: [
            'Input: n',
            'Is n = 0 (or n = 1)? → Yes: return 1 (base case) → End',
            'No: call factorial(n − 1) using a Sub-Process shape',
            'Multiply result of that call by n',
            'Return the product → End',
          ]},
          { type: 'tip', text: 'Use the Sub-Process shape (rectangle with double vertical bars) to represent the recursive call factorial(n-1). Label it clearly.' },
        ],
        hints: [
          'The Sub-Process box should be labelled "factorial(n − 1)".',
          'There must be a Process box after the Sub-Process to multiply: result = n × factorial(n-1).',
          'The base case (n = 0) must come BEFORE the recursive case.',
        ],
      },
      {
        id: 'merge-sort-lesson',
        type: 'lesson',
        title: 'Merge Sort — How it Works',
        content: [
          { type: 'para', text: 'Merge sort is a divide-and-conquer algorithm. It recursively splits the list in half until each sub-list has one element (which is trivially sorted), then merges the sub-lists back together in sorted order.' },
          { type: 'heading', text: 'The two phases' },
          { type: 'list', items: [
            'Divide: Split the list in half repeatedly until you have single-element lists.',
            'Conquer (Merge): Merge pairs of sorted lists into a larger sorted list. Repeat until one complete sorted list remains.',
          ]},
          { type: 'para', text: 'Merge sort is O(n log n) — significantly faster than the O(n²) sorts for large data sets. It is stable (equal elements maintain their original order) and is widely used in practice.' },
          { type: 'code', label: 'Pseudocode (high level)', text:
`FUNCTION mergeSort(list)
  IF LEN(list) <= 1 THEN
    RETURN list
  END IF
  mid = LEN(list) DIV 2
  left  = mergeSort(list[0 .. mid-1])
  right = mergeSort(list[mid .. end])
  RETURN merge(left, right)
END FUNCTION` },
        ],
      },
      {
        id: 'merge-sort-task',
        type: 'task',
        title: 'Task: Chart Merge Sort (High Level)',
        objective: 'Draw a high-level flowchart for merge sort, showing the divide phase and the merge phase. Use Sub-Process shapes for recursive calls.',
        difficulty: 'Expert',
        content: [
          { type: 'heading', text: 'Suggested approach — chart the merge function separately' },
          { type: 'list', items: [
            'Flowchart 1 — mergeSort(list):',
            '  Is length ≤ 1? → Yes: return list as-is',
            '  No: split into left and right halves',
            '  Call mergeSort(left) — Sub-Process',
            '  Call mergeSort(right) — Sub-Process',
            '  Call merge(left, right) — Sub-Process',
            '  Return merged result',
          ]},
          { type: 'list', items: [
            'Flowchart 2 — merge(left, right):',
            '  Set result = empty list, i = 0, j = 0',
            '  While items remain in both lists: compare left[i] and right[j], append the smaller to result',
            '  Append any remaining items from whichever list is not exhausted',
            '  Return result',
          ]},
          { type: 'tip', text: 'It is perfectly acceptable — and often clearer — to use multiple flowcharts for a complex algorithm. Use Sub-Process shapes to call between them.' },
        ],
        hints: [
          'The base case (length ≤ 1) is the most important part — without it the recursion never stops.',
          'The merge function is its own flowchart that can be drawn separately and referenced as a Sub-Process.',
        ],
      },
      {
        id: 'stack-queue',
        type: 'task',
        title: 'Task: Stack Push and Pop',
        objective: 'Draw two flowcharts — one for pushing an item onto a stack and one for popping an item from a stack. Include overflow and underflow checks.',
        difficulty: 'Intermediate',
        content: [
          { type: 'para', text: 'A stack is a Last-In-First-Out (LIFO) data structure. Items are added and removed from the top only. In computing, stacks are used for function calls, undo operations, and expression evaluation.' },
          { type: 'heading', text: 'Push (add to top)' },
          { type: 'list', items: [
            'Is stack full (stack pointer = max size)? → Yes: output "Stack overflow error" → End',
            'No: add item to top of stack',
            'Increment stack pointer',
            'End',
          ]},
          { type: 'heading', text: 'Pop (remove from top)' },
          { type: 'list', items: [
            'Is stack empty (stack pointer = 0)? → Yes: output "Stack underflow error" → End',
            'No: read item from top of stack',
            'Decrement stack pointer',
            'Return / output item',
            'End',
          ]},
        ],
        hints: [
          'The overflow/underflow checks must come FIRST — before any operation on the stack.',
          'The stack pointer is just a variable that tracks where the top of the stack is.',
        ],
      },
    ],
  },
];
